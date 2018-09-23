// import { shallowMount } from '@vue/test-utils'
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

import { ingredients } from '@/store/ingredients.json';
import { recipes } from '@/store/recipes.json';

describe("store actions", () => {
  
  it("fetches recipes", () => {
    let ingredientsState = [];
    let recipesState = [];

    const mockCommit = (mutation, payload) => {
        if(mutation === 'setIngredients') {
          ingredientsState = payload.ingredients;
        }
        else if(mutation === 'setRecipes') {
          recipesState = payload.recipes;
        }
    };

    actions.fetchRecipes({ commit: mockCommit })
      .then(() => {
        // silly test because ingredients and recipes are currently hardcoded into actions
        // in a real scenario, we'd mock an ajax library to return mock data and compare against that
        expect(ingredientsState).toEqual(ingredients);
        expect(recipesState).toEqual(recipes)
      });
  });
});

describe("store mutations", () => {
  it("setsIngredients to the state", () => {
    const state = {
      ingredients: []
    };
    const payload = {
      ingredients: [
        {
          title: "Anchovies",
          "use-by": "2019-01-05",
          "best-before": "2018-01-05"
        }
      ]
    };

    mutations.setIngredients(state, payload);
    expect(state).toEqual(payload);
  });

  it("setsRecipes to the state", () => {
    const state = {
      recipes: []
    };
    const payload = {
      recipes: [
        {
          title: "Pizza",
          ingredients: ["Anchovies", "Cheese"]
        }
      ]
    };

    mutations.setRecipes(state, payload);
    expect(state).toEqual(payload);
  });
});


describe("store mutations", () => {
  it("setsIngredients to the state", () => {
    const state = {
      ingredients: []
    };
    const payload = {
      ingredients: [
        {
          title: 'Anchovies',
          'use-by': '2019-01-05',
          'best-before': '2018-01-05'
        }
      ]
    };

    mutations.setIngredients(state, payload);
    expect(state).toEqual(payload);
  });

  it("setsRecipes to the state", () => {
    const state = {
      recipes: []
    };
    const payload = {
      recipes: [
        {
          title: 'Pizza',
          ingredients: ['Anchovies', 'Cheese']
        }
      ]
    };

    mutations.setRecipes(state, payload);
    expect(state).toEqual(payload);
  });
});

describe('store getters.ingredientsWithDate', () => {
  it('returns ingredients with date objects', () => {
    const state = {
      ingredients: [
        {
          title: 'Anchovies',
          'use-by': '2019-01-05',
          'best-before': '2018-01-05'
        }
      ]
    };

    const expected = [{
      title: 'Anchovies',
      useBy: new Date('2019-01-05'),
      bestBefore: new Date('2018-01-05')
    }];
  
    const result = getters.ingredientsWithDate(state);
    expect(result).toEqual(expected);
  });
});

describe('store getters.ingredientsUseByNotExpired', () => {
  it('returns ingredients use by that are not expired', () => {
    const mockGetters = {
      ingredientsWithDate: [
          {
            title: 'Anchovies',
            useBy: new Date('2016-01-05')
          },
          {
            title: 'Cheese',
            useBy: new Date('2019-01-05')
          }
        ]
    };
    const state = {}
    const expected = ['Cheese'];

    const result = getters.ingredientsUseByNotExpired(state, mockGetters);

    expect(result).toEqual(expected);
  });
});

describe('store getters.ingredientsBestBeforeExpired', () => {
  it('returns ingredients best before expired', () => {
    const mockGetters = {
      ingredientsWithDate: [
        {
          title: 'Anchovies',
          bestBefore: new Date('2016-01-05')
        },
        {
          title: 'Cheese',
          bestBefore: new Date('2019-01-05')
        }
      ]
    };
    const state = {}
    const expected = ['Anchovies'];

    const result = getters.ingredientsBestBeforeExpired(state, mockGetters);

    expect(result).toEqual(expected);
  });
});

describe("store getters.recipesAvailable", () => {
  it("returns recipes with ingredients not expired use by date", () => {
    const mockGetters = {
      ingredientsUseByNotExpired: [
        'Cheese',
        'Bread'
      ]
    };
    const state = {
      recipes: [
        {
          title: 'Pizza',
          ingredients: ['Anchovies', 'Cheese'], 
        },
        {
          title: 'Pie',
          ingredients: ['Anchovies', 'Flour']
        },
        {
          title: 'Sandwich',
          ingredients: ['Cheese', 'Bread']
        }
      ]
    };
    const expected = [
      {
        title: 'Sandwich',
        ingredients: ['Cheese', 'Bread']
      }
    ];

    const result = getters.recipesAvailable(state, mockGetters);

    expect(result).toEqual(expected);
  });
});

describe("store getters.recipesAvailableSorted", () => {
  it("returns available recipes sorted with expired best before at the bottom", () => {
    const mockGetters = {
      recipesAvailable: [
        {
          title: 'Pizza',
          ingredients: ['Anchovies', 'Cheese']
        },
        {
          title: 'Ramen',
          ingredients: ['Noodles', 'Chashu']
        },
        {
          title: 'Pie',
          ingredients: ['Anchovies', 'Flour']
        },
        {
          title: 'Sandwich',
          ingredients: ['Cheese', 'Bread']
        }
      ],
      ingredientsBestBeforeExpired: [
        'Anchovies'
      ]
    };
    const state = {};

    const expected = [
      {
        title: 'Ramen',
        ingredients: ['Noodles', 'Chashu']
      },
      {
        title: "Sandwich",
        ingredients: ["Cheese", "Bread"]
      },
      {
        title: "Pizza",
        ingredients: ["Anchovies", "Cheese"]
      },
      {
        title: "Pie",
        ingredients: ["Anchovies", "Flour"]
      }
    ];

    const result = getters.recipesAvailableSorted(state, mockGetters);

    expect(result).toEqual(expected);
  });
});