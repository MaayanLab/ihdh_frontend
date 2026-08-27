// Shared category -> gradient mapping so the category label, the
// affiliation badge, and anything else category-colored all agree.
// Lyme/Psych get the app's actual teal/coral brand gradients; any category
// added later (see datacrossways_api/project_categories.py) falls back to a
// deterministic pick from the same two gradients so it never breaks.

const CATEGORY_GRADIENTS = {
  lyme: "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)",
  psych: "linear-gradient(97.08deg, #F38B97 20.01%, #F4904D 75.82%)",
};

const FALLBACK_GRADIENTS = Object.values(CATEGORY_GRADIENTS);

export const gradientForCategory = (category) => {
  if (CATEGORY_GRADIENTS[category]) {
    return CATEGORY_GRADIENTS[category];
  }
  let hash = 0;
  for (let i = 0; i < (category || "").length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) % FALLBACK_GRADIENTS.length;
  }
  return FALLBACK_GRADIENTS[hash];
};
