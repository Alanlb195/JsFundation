import { findHeroById } from "./services/heroes.service";

const hero = findHeroById(2);

console.log(hero?.name ?? 'Hero not found');