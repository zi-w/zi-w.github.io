import { BeliefNode, EntityType, QuestProblem } from './types';

export const HERO_TITLE = "Human-AI Belief Alignment";
export const HERO_SUBTITLE = "Bridging the gap between vague human intent and precise AI execution through proactive communication.";

// Initial generic state before any clarification
export const INITIAL_BELIEF_GRAPH: BeliefNode[] = [
  {
    id: 'meal',
    label: 'Meal',
    type: EntityType.EXPLICIT,
    probability: 1.0,
    attributes: [
      {
        name: 'Cuisine',
        distribution: [
          { value: 'American', probability: 0.09 },
          { value: 'Chinese', probability: 0.09 },
          { value: 'Indian', probability: 0.09 },
          { value: 'European', probability: 0.09 },
          { value: 'Other', probability: 0.64 },
        ]
      }
    ]
  },
  {
    id: 'drink',
    label: 'Drink',
    type: EntityType.IMPLICIT,
    probability: 0.7,
    attributes: [
      {
        name: 'Type',
        distribution: [
          { value: 'Water', probability: 0.4 },
          { value: 'Coffee', probability: 0.2 },
          { value: 'Tea', probability: 0.2 },
          { value: 'Juice', probability: 0.2 },
        ]
      }
    ]
  },
  {
    id: 'utensils',
    label: 'Utensils',
    type: EntityType.IMPLICIT, // Changed from BACKGROUND as requested
    probability: 0.9,
    attributes: [
      {
        name: 'Main Tool',
        distribution: [
          { value: 'Fork/Knife', probability: 0.5 },
          { value: 'Chopsticks', probability: 0.25 },
          { value: 'Hands', probability: 0.25 },
        ]
      }
    ]
  },
  {
    id: 'video',
    label: 'Video', // Shortened label
    type: EntityType.BACKGROUND, // New 4th block
    probability: 1.0,
    attributes: [
      {
        name: 'Lighting',
        distribution: [
          { value: 'Natural Morning', probability: 0.6 },
          { value: 'Studio', probability: 0.4 },
        ]
      }
    ]
  }
];

export const QUEST_PROBLEMS: QuestProblem[] = [
  {
    id: 'math_1',
    domain: 'Math',
    context: "Janet had some eggs in her basket. She went to the market and bought 5 more eggs. Then she used 3 eggs to bake a cake.",
    underspecifiedPart: "How many eggs does she have now?",
    options: [
      {
        id: 'opt1',
        text: "No additional information needed.",
        isCorrect: false,
        explanation: "We cannot solve this because we don't know the starting number of eggs."
      },
      {
        id: 'opt2',
        text: "How many eggs did she start with?",
        isCorrect: true,
        explanation: "Correct! This is the missing variable (X) in the equation: Y = (X + 5) - 3."
      },
      {
        id: 'opt3',
        text: "What kind of cake did she bake?",
        isCorrect: false,
        explanation: "This is a distractor variable. It does not affect the calculation of the egg count."
      }
    ]
  },
  {
    id: 'logic_1',
    domain: 'Logic',
    context: "Rules: 1) Smart → Jittery. 2) Strange & Jittery → Stubborn. 3) Jittery & Worried → Pleasant. 4) Pleasant → Worried. Facts: Alice is smart. Alice is not stubborn.",
    underspecifiedPart: "Is Alice pleasant?",
    options: [
      {
        id: 'opt_l_1',
        text: "No questions needed.",
        isCorrect: false,
        explanation: "We know Alice is Jittery (from Smart), but we need to know if she is Worried to prove she is Pleasant (Rule 3)."
      },
      {
        id: 'opt_l_2',
        text: "Is Alice strange?",
        isCorrect: false,
        explanation: "We can deduce Alice is NOT strange. (Since she is Jittery and NOT Stubborn, Rule 2 implies Not Strange)."
      },
      {
        id: 'opt_l_3',
        text: "Is Alice worried?",
        isCorrect: true,
        explanation: "Correct. Since she is Jittery, knowing if she is Worried is the necessary and sufficient condition to determine if she is Pleasant (Rule 3)."
      }
    ]
  },
  {
    id: 'plan_1',
    domain: 'Planning',
    context: "Blocks: A, B, C, D. Initial: A & B on table. C not on B. A & D clear. Goal: Stack B on A.",
    underspecifiedPart: "Find a valid plan from the current state to the goal state.",
    options: [
      {
        id: 'opt_p_1',
        text: "Is block C on the table?",
        isCorrect: false,
        explanation: "The location of C doesn't affect the goal (Stack B on A) as long as it's not on B. We know C is not on B."
      },
      {
        id: 'opt_p_2',
        text: "Is block D on block B?",
        isCorrect: true,
        explanation: "Correct. To stack B, it must be clear. We know C isn't on it. If D is on B, we must move D first. If not, B is clear."
      },
      {
        id: 'opt_p_3',
        text: "No questions needed.",
        isCorrect: false,
        explanation: "We cannot form a plan without knowing if B is clear to be picked up."
      }
    ]
  }
];