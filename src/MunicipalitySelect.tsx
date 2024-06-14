export default ({ munis, onSelect }) => (
  <form class="max-w-sm mx-auto">
    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Select an option
    </label>
    <select
      onChange={({ target: { value } }) => onSelect(value)}
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="">
        Choose a municipality
      </option>

      {munis.map((muni) => {
        return (
          <option key={muni} value={muni}>
            {muni}
          </option>
        );
      })}
    </select>
  </form>
);
