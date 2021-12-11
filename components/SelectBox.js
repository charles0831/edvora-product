import styles from "styles/Home.module.css";

const SelectBox = (props) => {
  const { list, value, handleChange } = props;

  return (
    <select
      name="select"
      onChange={handleChange}
      value={value}
      className={"w-full flex justify-between items-center " + styles.select}
    >
      <option value={""} className={styles.option}></option>
      {list.map((item, index) => (
        <option key={index} value={item} className={styles.option}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
