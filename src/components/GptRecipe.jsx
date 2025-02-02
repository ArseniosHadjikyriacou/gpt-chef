import ReactMarkdown from "react-markdown"

export default function GptRecipe(props) {
  const lines = props.recipe.split('\n')
  const filteredLines = lines.filter((line) => !line.includes('```'))
  const recipe = filteredLines.join('\n');
  return (
      <section className="suggested-recipe-container">
        <h2>Chef Mistral Recommends:</h2>
        <ReactMarkdown  children={recipe} />
      </section>
  )
}