const x = {
  a: 1,
  b: 2,
};

const y = [1, 2];

const z = {
  a: {
    a: 1,
    b: 2,
  },
  b: [1, 2],
};

const a = { ...x };
//hasil a
const a2 = {
  a: 1,
  b: 2,
};

const a3 = { a: { a: 1, b: 2 }, b: { c: 1, d: 2 } };
// hasil a3
const a4 = { ...a3 };
const a5 = {
  a: { a: 1, b: 2 },
  b: { c: 1, d: 2 },
};

const b = { x };
//hasil b
const b2 = {
  x: {
    a: 1,
    b: 2,
  },
};

const c = x;
// hasil c
const c2 = {
  a: 1,
  b: 2,
};

const d = {
  email: "a@gmail.com",
  items: [
    {
      id: "12121",
      title: "as",
      body: "as",
    },
    {
      id: "cc",
      title: "cc",
      body: "cc",
    },
  ],
};

const d2 = { ...d, email: "angel2@gmail.com" };

const d3 = {
  email: "a@gmail.com",
  items: [
    {
      id: "12121",
      title: "as",
      body: "as",
    },
    {
      id: "cc",
      title: "cc",
      body: "cc",
    },
  ],
  email: "angel2@gmail.com",
};

const d4 = {
  email: "angel2@gmail.com",
  items: [
    {
      id: "12121",
      title: "as",
      body: "as",
    },
    {
      id: "cc",
      title: "cc",
      body: "cc",
    },
  ],
};

const d5 = {
  ...d4,
  email: "tes@gmail.com",
  items: [...d4.items].map(function (tes) {
    return {
      ...tes,
      title: "abc",
    };
  }),
};

const d6 = {
  ...d4,
  email: "tes@gmail.com",
  items: [...d4.items].map(function (tes) {
    return tes;
  }),
};

const d7 = {
  ...d4,
  email: "tes@gmail.com",
  items: [...d4.items].map(function (tes, index) {
    // gkprlu karna gk ada manipulasi didlm array nya jd gkprlu destructure
    if (index == 0) {
      return {
        ...tes,
        title: "abc",
      };
    } else {
      return tes; //reference gkusah destructure krn gk bakal diubah jd gkusa copy
    }
  }),
};

const d8 = {
  ...d4,
  email: "tes@gmail.com",
  items: d4.items.map(function (tes, index) {
    if (index == 0) {
      return {
        ...tes,
        title: "abc",
      };
    } else {
      return tes;
    }
  }),
};

// const d6 = {
//   ...d4,
//   email: "tes@gmail.com",
//   items: [...d4.items].map(function (tes) {
//     const a = (tes.title = "abc"); // sesat :D
//     return a;
//   }),
// };
