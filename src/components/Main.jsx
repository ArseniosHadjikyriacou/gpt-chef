import React from "react"
import IngredientsList from "./IngredientsList"
import GptRecipe from "./GptRecipe"
import { getRecipeFromMistral } from "../gpt"

export default function Main() {

    const [ingredients, setIngredients] = React.useState(JSON.parse(localStorage.getItem('ingredients')) || [])
    const [recipe, setRecipe] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(ingredients))
    },[ingredients])

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    },[recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients,setLoading)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        // boolean in ingredient state shows if ingredient is currently being modified
        const newIngredient = [formData.get("add-ingredient"), false]
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function deleteIngredient(ingredient) {
        setIngredients(prevIngredients => prevIngredients.filter(prev => prev[0] !== ingredient))
    }

    function changeIngredient(formData,ingredient) {
        if (formData.get("change-ingredient")) {
            const newIngredient = [formData.get("change-ingredient"), false]
            setIngredients(prevIngredients => prevIngredients.map(prev => {
                if (prev[0] === ingredient) {
                    return newIngredient
                } else {
                    return prev
                }
            }))
        } else {
            setIngredients(prevIngredients => prevIngredients.map(prev => {
                if (prev[0] === ingredient) {
                    return [ingredient,!prev[1]]
                } else {
                    return prev
                }
            }))
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="add-ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                    deleteIngredient={deleteIngredient}
                    changeIngredient={changeIngredient}
                />
            }

            {(recipe && ingredients.length > 3) && <GptRecipe recipe={recipe} />}
        </main>
    )
}