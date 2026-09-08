import type { Solution } from "@/types/solution";

import { aiRecruiter } from "./ai-recruiter";
import { chatBotDlyaRekrutinga } from "./chat-bot-dlya-rekrutinga";

export const solutionRegistry: Solution[] = [aiRecruiter, chatBotDlyaRekrutinga];
