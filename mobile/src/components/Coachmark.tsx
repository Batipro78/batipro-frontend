import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

interface Measurable {
  measureInWindow: (
    cb: (x: number, y: number, w: number, h: number) => void
  ) => void;
}

export interface CoachStep {
  key: string;
  title: string;
  text: string;
  /** Élément à surligner (ex: () => ref.current). Null/absent = bulle centrée sans spotlight. */
  getTarget?: () => Measurable | null | undefined;
  /** Action avant l'affichage (ex: faire défiler pour rendre la cible visible). */
  beforeShow?: () => void | Promise<void>;
  /** Libellé du bouton principal pour cette étape. */
  ctaLabel?: string;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const PAD = 10; // marge autour de la cible
const BUBBLE_W = Math.min(330, SCREEN_W - spacing.lg * 2);

/**
 * Coach-marks maison (sans dépendance) : voile sombre + surbrillance d'un
 * élément réel + bulle explicative. Supporte une ou plusieurs étapes.
 *
 * La mesure de la cible se fait via measureInWindow ; le Modal est
 * statusBarTranslucent pour que (0,0) du Modal == (0,0) de la fenêtre,
 * sinon les coordonnées seraient décalées de la hauteur de la status bar.
 */
export function Coachmark({
  steps,
  visible,
  onFinish,
  onSkip,
}: {
  steps: CoachStep[];
  visible: boolean;
  onFinish: () => void;
  onSkip: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const [bubbleH, setBubbleH] = useState(0);
  const cancelled = useRef(false);

  // (Ré)initialise à l'ouverture.
  useEffect(() => {
    if (visible) setIndex(0);
  }, [visible]);

  // Mesure la cible de l'étape courante (après un éventuel scroll + settle).
  useEffect(() => {
    if (!visible) return;
    cancelled.current = false;
    setReady(false);
    setRect(null);

    const run = async () => {
      const s = steps[index];
      if (!s) return;
      try {
        await s.beforeShow?.();
      } catch {
        /* noop */
      }
      // Laisser le layout se stabiliser (scroll, montage).
      await new Promise<void>((r) => setTimeout(r, 260));
      if (cancelled.current) return;

      const target = s.getTarget?.();
      if (!target || typeof target.measureInWindow !== 'function') {
        setRect(null);
        setReady(true);
        return;
      }
      const attempt = (n: number) => {
        target.measureInWindow((x, y, w, h) => {
          if (cancelled.current) return;
          if ((w === 0 || h === 0) && n < 4) {
            setTimeout(() => attempt(n + 1), 170);
            return;
          }
          setRect(w === 0 || h === 0 ? null : { x, y, w, h });
          setReady(true);
        });
      };
      attempt(0);
    };
    void run();

    return () => {
      cancelled.current = true;
    };
  }, [visible, index, steps]);

  if (!visible) return null;
  const step = steps[index];
  if (!step) return null;
  const isLast = index === steps.length - 1;

  const next = () => (isLast ? onFinish() : setIndex((i) => i + 1));

  // Position verticale de la bulle : sous le trou si possible, sinon au-dessus,
  // sinon centrée (pas de cible).
  const bh = bubbleH || 210;
  let bubbleTop: number;
  if (rect) {
    const below = rect.y + rect.h + PAD + 14;
    if (SCREEN_H - below > bh + 24) {
      bubbleTop = below;
    } else {
      bubbleTop = Math.max(50, rect.y - PAD - 14 - bh);
    }
  } else {
    bubbleTop = Math.max(80, SCREEN_H / 2 - bh / 2);
  }

  const hole = rect
    ? {
        top: rect.y - PAD,
        left: rect.x - PAD,
        width: rect.w + PAD * 2,
        height: rect.h + PAD * 2,
      }
    : null;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onSkip}
    >
      <View style={styles.root}>
        {rect && hole ? (
          <>
            {/* Voile en 4 rectangles autour de la cible (laisse un "trou"). */}
            <View
              style={[
                styles.mask,
                { top: 0, left: 0, right: 0, height: Math.max(0, rect.y - PAD) },
              ]}
            />
            <View
              style={[
                styles.mask,
                { top: rect.y + rect.h + PAD, left: 0, right: 0, bottom: 0 },
              ]}
            />
            <View
              style={[
                styles.mask,
                {
                  top: rect.y - PAD,
                  left: 0,
                  width: Math.max(0, rect.x - PAD),
                  height: rect.h + PAD * 2,
                },
              ]}
            />
            <View
              style={[
                styles.mask,
                {
                  top: rect.y - PAD,
                  left: rect.x + rect.w + PAD,
                  right: 0,
                  height: rect.h + PAD * 2,
                },
              ]}
            />
            {/* Anneau de surbrillance autour de la cible. */}
            <View pointerEvents="none" style={[styles.ring, hole]} />
          </>
        ) : (
          <View style={[styles.mask, StyleSheet.absoluteFillObject]} />
        )}

        {ready ? (
          <View
            style={[styles.bubble, { top: bubbleTop }]}
            onLayout={(e) => setBubbleH(e.nativeEvent.layout.height)}
          >
            <View style={styles.headerRow}>
              <Text style={styles.stepCount}>
                Étape {index + 1}/{steps.length}
              </Text>
              <Pressable onPress={onSkip} hitSlop={10}>
                <Text style={styles.skip}>Passer</Text>
              </Pressable>
            </View>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.text}>{step.text}</Text>
            <View style={styles.dots}>
              {steps.map((s, i) => (
                <View
                  key={s.key}
                  style={[styles.dot, i === index && styles.dotActive]}
                />
              ))}
            </View>
            <Pressable
              onPress={next}
              style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
            >
              <Text style={styles.ctaText}>
                {step.ctaLabel ?? (isLast ? 'Terminer' : 'Suivant')}
              </Text>
              <Ionicons
                name={isLast ? 'checkmark' : 'arrow-forward'}
                size={18}
                color="#fff"
              />
            </Pressable>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  mask: { position: 'absolute', backgroundColor: 'rgba(15,23,42,0.82)' },
  ring: {
    position: 'absolute',
    borderRadius: radius.lg,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE_W,
    left: (SCREEN_W - BUBBLE_W) / 2,
    backgroundColor: '#fff',
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCount: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  skip: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontWeight: '600',
  },
  title: { fontSize: fontSize.lg, fontWeight: '800', color: colors.foreground },
  text: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 20 },
  dots: { flexDirection: 'row', gap: 6, marginTop: spacing.xs },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: radius.full,
    marginTop: spacing.xs,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: fontSize.base },
});
