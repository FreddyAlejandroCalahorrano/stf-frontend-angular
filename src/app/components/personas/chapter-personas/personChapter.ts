import { Persona } from "../personas";
import { Chapter } from "./chapter";

export interface PersonChapter {
    personTo: Persona,
    chapterToList: Chapter[],
}