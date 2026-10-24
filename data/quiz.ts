import type { FragranceSlug } from "@/types/product";

export type Weights = Partial<Record<FragranceSlug, number>>;

export interface QuizOption {
  id: string;
  label: string;
  hint: string;
  weights: Weights;
  /** Short phrase used to explain the recommendation */
  reason: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: readonly QuizOption[];
}

export const quizQuestions: readonly QuizQuestion[] = [
  {
    id: "mood",
    topic: "Mood",
    prompt: "Which feeling would you like to carry with you?",
    options: [
      { id: "inward", label: "Quiet and inward", hint: "Still, reflective, close", weights: { dusk: 3 }, reason: "you're drawn to quiet, inward moods" },
      { id: "clear", label: "Calm and clear", hint: "Light, open, unhurried", weights: { dawn: 3 }, reason: "you want to feel calm and clear" },
      { id: "expressive", label: "Warm and expressive", hint: "Generous, glowing, felt", weights: { ember: 3 }, reason: "you lean towards warmth and expression" },
    ],
  },
  {
    id: "atmosphere",
    topic: "Atmosphere",
    prompt: "Choose a place you would like to linger.",
    options: [
      { id: "library", label: "A dim room of old wood", hint: "Shadows, books, stillness", weights: { dusk: 2, ember: 1 }, reason: "you chose the shelter of old wood and shadow" },
      { id: "sunroom", label: "A sunlit room, windows open", hint: "Linen, air, morning", weights: { dawn: 3 }, reason: "you chose a sunlit room with open windows" },
      { id: "courtyard", label: "A courtyard after dark", hint: "Warm stone, candlelight", weights: { ember: 2, dusk: 1 }, reason: "you chose warm stone and candlelight" },
    ],
  },
  {
    id: "intensity",
    topic: "Presence",
    prompt: "How would you like your scent to be noticed?",
    options: [
      { id: "close", label: "Only by those close to me", hint: "A skin scent, discreet", weights: { dawn: 2, dusk: 1 }, reason: "you prefer a scent that stays close to the skin" },
      { id: "passing", label: "As I pass by", hint: "Present, but restrained", weights: { dusk: 2, ember: 1 }, reason: "you like a presence that is felt in passing" },
      { id: "trace", label: "Long after I've left", hint: "A lingering trail", weights: { ember: 3 }, reason: "you want a trace that remains after you leave" },
    ],
  },
  {
    id: "material",
    topic: "Material",
    prompt: "Which materials draw you in?",
    options: [
      { id: "woods", label: "Cedar and vetiver", hint: "Dry woods, roots, smoke", weights: { dusk: 3 }, reason: "cedar and vetiver speak to you" },
      { id: "petals", label: "Iris and white musk", hint: "Powdery petals, clean skin", weights: { dawn: 3 }, reason: "iris and white musk speak to you" },
      { id: "resins", label: "Saffron and incense", hint: "Spice, resin, glow", weights: { ember: 3 }, reason: "saffron and incense speak to you" },
    ],
  },
  {
    id: "time",
    topic: "Time of day",
    prompt: "When do you feel most like yourself?",
    options: [
      { id: "morning", label: "Early morning", hint: "Before the day begins", weights: { dawn: 2 }, reason: "you feel most yourself in the early morning" },
      { id: "evening", label: "As daylight fades", hint: "The hour between", weights: { dusk: 2 }, reason: "you come alive as daylight fades" },
      { id: "night", label: "Deep into the night", hint: "Late, slow, intimate", weights: { ember: 2 }, reason: "you feel most yourself late at night" },
    ],
  },
];

/** When two fragrances tie, the answer to this question decides. */
export const TIE_BREAK_QUESTION = "material";
