import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (
      !arr
        .map((el) => {
          return el.country;
        })
        .includes(city.country)
    ) {
      return [
        ...arr,
        { country: city.country, emoji: flagemojiToPNG(city.emoji) },
      ];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}

export default CountryList;
