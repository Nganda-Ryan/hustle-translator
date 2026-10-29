import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "public/datas/datas.json"), "utf8")
);

const roleDescriptions = {
  frontend: "Architect of interfaces and guardian of user experience.",
  backend: "Master of invisible mechanisms, data, and the realm's inner workings.",
  fullstack:
    "Builder who unites visible façades with secret foundations.",
  mobile: "Crafts portable artifacts that follow travelers everywhere.",
  devops:
    "Guardian of fortifications, deployments, and the roads to production.",
  software_engineer: "Engineer of systems and builder of lasting solutions.",
  data_engineer: "Keeper of data rivers and the kingdom's archives.",
  ai_engineer:
    "Invoker of artificial minds and explorer of knowledge's frontiers.",
  game_developer:
    "Creator of worlds, quests, and mechanics that stretch imagination.",
  qa_engineer:
    "Sentinel who tests fortresses before their gates open to the public.",
  security_engineer:
    "Protector of secrets, access, and digital treasure.",
  tech_lead:
    "Commander of technical companies and arbiter of great architecture choices.",
  other: "Any other artisan who devotes mind and hands to digital craft.",
};

const options = {};
for (const option of data.inputs.role.options) {
  options[option.value] = {
    label:
      option.value === "other" ? "Other specialty" : option.label,
    description: roleDescriptions[option.value] ?? option.description,
  };
}

function roleMessages(title) {
  return {
    frontend: `You give ideas a visible face in the kingdom. As ${title}, may your interfaces guide people toward their goals.`,
    backend: `You tend the hidden mechanisms that keep citadels running. As ${title}, may each reliable service deepen the realm's trust.`,
    fullstack: `You connect façades to foundations. As ${title}, may your systems stay coherent from surface to core.`,
    mobile: `You craft tools that travel in every pocket. As ${title}, may your apps stay useful on every journey.`,
    devops: `You guard deployments and the roads to production. As ${title}, may delivery become steady rather than heroic.`,
    software_engineer: `You engineer durable solutions. As ${title}, may what you build remain understandable and useful.`,
    data_engineer: `You steward rivers of data and the archives. As ${title}, may knowledge stay ordered and trustworthy.`,
    ai_engineer: `You explore artificial intelligence with measure. As ${title}, may your models serve real needs with open eyes.`,
    game_developer: `You forge worlds, quests, and playful rules. As ${title}, may every prototype open a door to wonder.`,
    qa_engineer: `You test fortresses before the gates open. As ${title}, may defects fall in the workshop, not in battle.`,
    security_engineer: `You protect secrets, access, and digital treasure. As ${title}, may prudence outpace panic.`,
    tech_lead: `You guide technical companies and weighty choices. As ${title}, may listening and clarity precede command.`,
    other: `You deepen the craft in your own way. As ${title}, may every solved problem strengthen your path.`,
  };
}

const proclamations = {
  "squire-of-code":
    "Hear ye, people of the Kingdom of a Thousand Algorithms! The guild bells ring for a new aspirant to the coding arts — a Squire of the First Lines, standing at the threshold of a vast realm yet to be mapped. May errors teach patience, documentation reveal its secrets, and every function become a stone in the foundation of a greater future.",
  "apprentice-of-the-guild":
    "By guild decree and before assembled masters, let it be proclaimed that this artisan has left the ranks of mere observers! Here stands the Sworn Apprentice, who has begun to recognize syntax traps, logic detours, and the demands of well-built work. May mistakes be witnesses of learning, not shame, and may ambition never outgrow the will to understand.",
  "artisan-of-code":
    "Let the workshops open and the forges glow! A new artisan stands before the Council of Builders, learning that coding is not only making machines run, but giving them structure, purpose, and usefulness. May each finished project testify to growing skill and sound judgment.",
  "knight-of-debugging":
    "Silence in the ranks! Let trumpets announce a Knight of the Blade and Debugging, who has crossed the first battles of development and learned to pursue a problem through many layers. May the blade of resolution find root causes, and may persistence turn confusion into victory.",
  "guild-master":
    "By the seal of the guild, a Grand Guild Master of Code is recognized — a builder who commands respect across teams and systems. May your craft elevate others, your decisions stay grounded in experience, and your name be spoken with trust in the halls of engineering.",
  "baron-of-architecture":
    "Let the council chambers fall silent! Before us stands a Baron of Eternal Architectures, who knows a citadel is judged not by tower height but by the strength of its foundations. May your structures outlast fashions and your plans leave room for those who build after you.",
  "count-of-systems":
    "Let it be known across the provinces that a Count of the Great Systems has been recognized — steward of complex domains where many services must move as one. May your systems stay coherent under pressure and your judgment guide the realm through change.",
  "duke-of-technology":
    "Raise the banners! A Duke of High Technologies is proclaimed, whose long service has shaped platforms, practices, and the pace of the kingdom itself. May your influence make delivery safer and teams more capable of steering their own fate.",
  "prince-of-architects":
    "Before the high citadel, the guild recognizes a Crown Prince of the Great Architects — a guardian of wisdom accumulated across seasons of technology. May your counsel help future builders choose what endures over what merely dazzles.",
  "sovereign-of-code":
    "LET THE BELLS OF THE KINGDOM RING! Today the guild proclaims the symbolic ascendance of an Eternal Sovereign of the Kingdom of Code — not as a claim of infallibility, but as honor for a life devoted to building, solving, and teaching. May your experience light unexplored paths and inspire generations yet to come!",
};

const personalizations = {
  "squire-of-code": {
    messagePrefix:
      "The Registry recognizes your entry into the Guild of Code Builders.",
    messageSuffix:
      "Keep your shield close: every legend begins before the realm knows your name.",
  },
  "apprentice-of-the-guild": {
    messagePrefix: "The guild acknowledges your first steps in practicing your art.",
    messageSuffix:
      "Do not seek the crown yet — forge first the skills that could one day support it.",
  },
  "artisan-of-code": {
    messagePrefix:
      "The guild recognizes your shift from study to tangible craft.",
    messageSuffix:
      "Let the quality of your work speak louder than promises.",
  },
  "knight-of-debugging": {
    messagePrefix:
      "The guild grants you the right to wield the sword of problem solving.",
    messageSuffix:
      "Through constancy comes victory — keep pursuing the truth beneath the symptom.",
  },
  "guild-master": {
    messagePrefix:
      "The guild salutes a master whose craft is felt across many teams.",
    messageSuffix:
      "Lead by example: the strongest title is the trust others place in you.",
  },
  "baron-of-architecture": {
    messagePrefix:
      "The guild entrusts you with the symbolic care of foundations and grand designs.",
    messageSuffix:
      "Build systems that future builders can extend without fear.",
  },
  "count-of-systems": {
    messagePrefix:
      "The guild recognizes your stewardship of large, interconnected domains.",
    messageSuffix:
      "May coherence survive scale and change alike.",
  },
  "duke-of-technology": {
    messagePrefix:
      "The guild honors your influence on platforms, delivery, and technical culture.",
    messageSuffix:
      "Make the path to production a mastered road, not a trial of courage.",
  },
  "prince-of-architects": {
    messagePrefix:
      "The high council inclines before your long path through the digital ages.",
    messageSuffix:
      "Your legacy is measured in what others can build because you showed the way.",
  },
  "sovereign-of-code": {
    messagePrefix:
      "The grand council, workshop masters, and chroniclers bow to your journey.",
    messageSuffix:
      "May future generations learn from your works, your mistakes, and the paths you opened.",
  },
};

const mottoEn = {
  "Omne opus a prima linea incipit.":
    "Every work begins with a first line.",
  "Discere est prima victoria.":
    "Learning is the first victory.",
  "Ars per opus demonstratur.":
    "Art is proven through the work.",
  "Per constantiam ad victoriam.":
    "Through constancy comes victory.",
  "Scientia et labor regnum firmant.":
    "Knowledge and labor strengthen the realm.",
  "Fundamenta aeterna manent.":
    "Foundations endure.",
  "Magnum opus multis partibus constat.":
    "A great work is made of many parts.",
  "Innovatio cum prudentia.":
    "Innovation with prudence.",
  "Sapientia generat futurum.":
    "Wisdom begets the future.",
  "Ex sapientia, regnum construitur.":
    "Through wisdom the kingdom is built.",
};

const ranksById = {};
for (const rank of data.ranks) {
  ranksById[rank.id] = {
    shortTitle: rank.englishTitle,
    name: rank.englishTitle,
    ceremonialTitle: rank.englishTitle,
    mottoTranslation: mottoEn[rank.motto] ?? rank.mottoTranslation,
    proclamation: proclamations[rank.id],
    roleMessages: roleMessages(rank.englishTitle),
    personalization: personalizations[rank.id],
  };
}

const patch = {
  project: {
    language: "en",
    description:
      "A royal registry that turns a developer's role and experience into a digital noble title, coat of arms, and epic proclamation.",
    lore: {
      kingdom: "The Kingdom of a Thousand Algorithms",
      guild: "The Guild of Code Builders",
      royalOrder: "The Order of Ten Insignia",
      intro:
        "In the digital age, when realms crumble under compile errors and old architectures fade, one fellowship remains. Its members wield logic as others wield swords, inscribe oaths in lines of code, and raise citadels time cannot easily destroy. Present yourself before the Grand Registry: declare your craft, reveal the years devoted to it, and let the guild proclaim the rank you are owed.",
      closing:
        "May your code stay robust, your deploys victorious, and production bugs spare your nights.",
    },
    evaluation: {
      rankingNote:
        "In this playful version, years of experience determine rank. Role personalizes title, feats, and proclamation. Seniority alone is not a measure of real skill.",
    },
  },
  inputs: {
    role: {
      label: "Which craft do you practice in the realm?",
      placeholder: "Choose your specialty…",
      options,
    },
    yearsOfExperience: {
      label: "How many years have you devoted to this craft?",
      placeholder: "E.g. 5",
      helpText:
        "Count real development experience — not the number of languages installed on your machine.",
    },
  },
  rankRules: {
    invalidInputMessage:
      "The Grand Registry does not recognize this duration. Enter a whole number between 0 and 80.",
    rankNotFoundMessage:
      "The royal scribe found no rank matching your path.",
  },
  resultTemplate: {
    eyebrow: "THE GUILD'S GRAND REGISTRY",
    heading: "The realm recognizes your name",
    rankLabel: "Noble title",
    roleLabel: "Craft practiced",
    experienceLabel: "Years in service of code",
    proclamationLabel: "Royal proclamation",
    specializationLabel: "Your order's oath",
    virtuesLabel: "Virtues of your rank",
    achievementsLabel: "Recognized feats",
    mottoLabel: "Motto of your coat of arms",
    shareTextTemplate:
      "By the guild's great seal, I am recognized as {ceremonialTitle} after {yearsOfExperience} year(s) devoted to the craft of code. My motto: « {mottoTranslation} » May the digital chronicles remember my passage! #TheHustleTranslator #DevelopersDay",
    footer:
      "Titles are symbolic. True nobility in code is also measured by what you build, learn, and pass on.",
  },
  ranksById,
};

const outPath = path.join(root, "public/datas/i18n/en.json");
fs.writeFileSync(outPath, `${JSON.stringify(patch, null, 2)}\n`);
console.log(`Wrote ${outPath}`);
