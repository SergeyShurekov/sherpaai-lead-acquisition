import type { Solution } from "@/types/solution";

import { aiRecruiter } from "./ai-recruiter";
import { chatBotDlyaRekrutinga } from "./chat-bot-dlya-rekrutinga";
import { avtomatizaciyaRekrutinga } from "./avtomatizaciya-rekrutinga";
import { hrAssistent } from "./hr-assistent";

export const solutionRegistry: Solution[] = [
    aiRecruiter,
    chatBotDlyaRekrutinga,
    avtomatizaciyaRekrutinga,
    hrAssistent,
];
