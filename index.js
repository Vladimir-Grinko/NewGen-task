// Список курсов
let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь

let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];
let requiredRange4 = [null, null]; // моя дополнительная проверка, если вдруг пользователь выберет такой фильтр

// ОПИСАНИЕ:
// данную задачу я решил с помошью определения границ фильтров, чтобы сократить количество итераций по двум массивам.
// при выполнении определенного условия будет возвращаться отфильтрованный массив курсов, где
// диапазон цен будет соответствовать вводным вариантам.
// здесь пришлось учесть значения элементов массива цен каждого объекта курса и для них выполнить проверку на соответствие диапазону цен
// для решения использовал методы массивов: filter(); some() и обычное сравнение для элементов по первому и последнему индексам

// Вывод:

// функция вернет массив курсов по фильтрам
function filteredCourses(coursesDefault, filter) {
  // для улучшения читабельноси кода определил границы фильтра
  let min = filter[0]; // минимальная граница фильтра
  let max = filter[filter.length - 1]; // максимальная граница фильтра

  // фильтрацию разбил на условия, при которых будет формироваться массив курсов, подходящих по фильтру
  if (min === null) {
    return coursesDefault.filter(
      (course) =>
        (course.prices[course.prices.length - 1] === min &&
          course.prices[0] <= max) ||
        (course.prices.some((price) => price <= max) &&
          course.prices[course.prices.length - 1] !== min)
    );
  }

  if (max === null && min !== null) {
    return coursesDefault.filter((course) =>
      course.prices.some((price) => price >= min)
    );
  }

  if (min !== null && max !== null) {
    return coursesDefault.filter((course) =>
      course.prices.some((price) => price <= max && price >= min)
    );
  }
}

function mappedNameCourses() {
  // функция для выведения массива названий курсов, передается параметром в метод map()
  return (course) => course.name;
}

// [подходящие курсы для каждого варианта фильтра]
console.log(
  "war1",
  filteredCourses(courses, requiredRange1).map(mappedNameCourses())
); // ['Courses in England', 'Courses in Italy', 'Courses in Russia', 'Courses in China', 'Courses in USA', 'Courses in Kazakhstan', 'Courses in France']
console.log("---------------");
console.log(
  "war2",
  filteredCourses(courses, requiredRange2).map(mappedNameCourses())
); // ['Courses in England', 'Courses in Italy', 'Courses in China', 'Courses in USA', 'Courses in Kazakhstan']
console.log("---------------");
console.log(
  "war3",
  filteredCourses(courses, requiredRange3).map(mappedNameCourses())
); // ['Courses in Germany', 'Courses in Italy', 'Courses in Russia', 'Courses in China', 'Courses in USA', 'Courses in Kazakhstan']
console.log("---------------");
console.log(
  "war4",
  filteredCourses(courses, requiredRange4).map(mappedNameCourses())
); // ['Courses in England', 'Courses in Russia', 'Courses in France']

//-----------------------------------------------------------

// ДОПОЛНИТЕЛЬНЫЙ МЕТОД СОРТИРОВКИ КУРСОВ ПО ЦЕНЕ
// функция принимает первым параметром массив курсов, вторым параметром - строку "toMax"(по возрастанию) или "toMin"(по уменьшению цены)
function sortedCourses(coursesDefault, sortParametr) {
  let result = [];

  coursesDefault.forEach((course) => {
    // для реализации сортировки достаточно взять первый элемент массива цен
    result.push({ name: course.name, price: course.prices[0] }); // помещаем в пустой массив объект курса с минимальной ценой
  });
  return result.sort(sortedOfPrice(sortParametr));
}

// функция реализует метод сортировки, передается параметром в метод sort()
function sortedOfPrice(parametr) {
  // принимает строку "toMax"(по возрастанию цены) или "toMin"(по уменьшению цены)
  if (parametr === "toMax") {
    return (a, b) => (a.price > b.price ? 1 : -1);
  }
  if (parametr === "toMin") {
    return (a, b) => (a.price < b.price ? 1 : -1);
  }
}
console.log("sort", sortedCourses(courses, "toMin")); // выведет отсортированный заданный массив курсов
console.log("------------");
console.log(
  "sort",
  sortedCourses(filteredCourses(courses, requiredRange1), "toMax")
); // выведет отсортированный массив курсов, который был отфильтрован
