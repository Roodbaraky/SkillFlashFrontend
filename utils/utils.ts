export interface IsError {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
  general?: string;
}
export interface HomeDeck {
  _id: string;
  username: string;
  deckName: string;
  tags: string[];
  cards: Card[];
}
export interface Card {
  card_id: number;
  Q: string;
  A: string;
  tag: string;
  Y: number;
  N: number;
}
export function checkField(
  field: string,
  setIsError: Function,
  valueInput: string
) {
  const passRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (field === "username" && valueInput.length < 3) {
    setIsError((currentError: IsError) => {
      return { ...currentError, username: "Please enter a valid username" };
    });
  }
  if (field === "password" && !passRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return {
        ...currentError,
        password:
          "Password must be 8+ characters and contain at least one of the following: uppercase, lowercase, number, and special character(@$!%*?&)",
      };
    });
  }
  if (field === "confirmPassword" && !valueInput) {
    setIsError((currentError: IsError) => {
      return {
        ...currentError,
        confirmPassword: "Please confirm your password",
      };
    });
  }
  if (field === "email" && !emailRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return { ...currentError, email: "Please enter a valid email" };
    });
  }
}

interface TestTags {
  tagName: string;
  tagCategory: string;
}

export function splitByCategory(allTags: TestTags[]) {
  const tagsByCat = {};
  allTags.map((tag) => {
    const category = tag.tagCategory;
    if (!tagsByCat[category]) {
      tagsByCat[category] = [tag.tagName];
    } else {
      tagsByCat[category].push(tag.tagName);
    }
  });
  const finalArray = [];
  for (const category in tagsByCat) {
    finalArray.push({ category: category, tags: tagsByCat[category] });
  }

  return finalArray;
}
