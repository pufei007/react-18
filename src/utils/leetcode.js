const containsDuplicate = (nums) => {
  let map = new Map();
  for (let i of nums) {
    console.log("i", i);
    if (map.has(i)) {
      return true;
    } else {
      map.set(i, 1);
    }
  }
  return false;
};

// containsDuplicate([1,2,3,4,5,3,2,1])
console.log(containsDuplicate([1, 2, 3, 4, 5, 3, 2, 1]));

//多数元素
const majorityElement = (nums) => {
  const map = {};
  const middleNum = nums.length / 2;
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      map[nums[i]] += 1;
    } else {
      map[nums[i]] = 1;
    }

    if (map[nums[i]] > middleNum) {
      return nums[i];
    }
  }
};

// majorityElement([1, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2]);
console.log(majorityElement([1, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2]));

// 只出现一次的数字
const singleNumber = (nums) => {
  const map = {};
  for (let i of nums) {
    if (map[i]) {
      map[i] += 1;
    } else {
      map[i] = 1;
    }
  }
  console.log("map", map);
  for (let i in map) {
    if (map[i] === 1) {
      return i;
    }
  }
};
const singleNumberFunc = function (nums) {
  let init = nums[0];
  for (let i = 1; i < nums.length; i++) {
    init ^= nums[i];
  }
  return init;
};

console.log(singleNumber([1, 2, 3, 4, 4, 4, 3, 2, 1, 2, 3, 4, 6]));
console.log(singleNumberFunc([1, 2, 3, 4, 4, 4, 3, 2, 1, 2, 3, 4, 6]));

// 两数组交集
const intersection = () => {
  const arr1 = [1, 2, 2, 1];
  const arr2 = [2, 2];
  return [...new Set(nums1)].filter((item) => new Set(nums2).has(item));
  // return arr1.filter((item) => arr2.includes(item));
};
const intersectionMap = (nums1, nums2) => {
  const map = {};
  const ret = [];
  for (let i = 0; i < nums1.length; i++) {
    map[nums1[i]] = true;
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map[nums2[i]]) {
      ret.push(nums2[i]);
      map[nums2[i]] = false;
    }
  }
  return ret;
};

console.log(intersection([1, 2, 2, 1]));
intersectionMap([2, 4, 2, 6, 7], [1, 2, 3, 4, 5]);
console.log(intersectionMap([2, 4, 2, 6, 7], [1, 2, 3, 4, 5]));

// 反转字符串
const reverseString = (s) => {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
  return s;
};

console.log(reverseString("hello".split("")));
