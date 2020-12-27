import React from "react";
import Section from "../QuestionSection";
import styles from "./QuestionPage.module.scss";

function QuestionPage({ pageData, progress, answers, onChange }) {
  const { Name: name, Sections: sections } = pageData;

  return (
    <div className={styles.Root}>
      {name && <h2>{`${name} Page`}</h2>}
      {!isNaN(progress) && <h3>{`Progress: ${progress}%`}</h3>}
      {sections &&
        sections.map((section) => (
          <Section
            key={section["SectionID"]}
            sectionData={section}
            answers={answers}
            onChange={onChange}
          />
        ))}
    </div>
  );
}

export default QuestionPage;
