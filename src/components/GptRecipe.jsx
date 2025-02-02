import ReactMarkdown from "react-markdown"

export default function GptRecipe(props) {
  return (
      <section className="suggested-recipe-container">
        <h2>Chef Mistral Recommends:</h2>
        <ReactMarkdown  children={props.recipe} />
      </section>
  )
}