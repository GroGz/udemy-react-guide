import person from './person.js';
import prs from './person.js';

import { baseData } from './utility.js';
import { baseData as bd } from "./utility.js";
import * as bundled from "./utility.js";

console.log(person.name);
console.log(prs.name);

console.log(baseData);
console.log(bd);
console.log(bundled.baseData);
bundled.clean();

