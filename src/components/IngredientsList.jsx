import CircularProgress from '@mui/material/CircularProgress'

export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient[0]}>

            <form
            action={form => props.changeIngredient(form,ingredient[0])} 
            className="change-ingredient-form">

                <div className='ingredient-container'>

                    { ingredient[1] ? 
                    <input 
                        autoFocus
                        type="text" 
                        name='change-ingredient'
                        defaultValue={ingredient[0]} /> 
                    : <span>{ingredient[0]}</span> }

                    <div className='change-button-container'>
                        <button className='change-button'>
                            {ingredient[1] ? 'apply' : 'change'}
                        </button>
                    </div>

                    <button 
                        type='button'
                        className='delete-button'
                        onClick={() => props.deleteIngredient(ingredient[0])}>
                    x</button>

                </div>

            </form>

        </li>
  ))
  return (
      <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
          {props.ingredients.length > 3 && <div className="get-recipe-container">
              <div ref={props.ref}>
                  <h3>Ready for a recipe?</h3>
                  <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <div className='get-button-container'>
                <button onClick={props.getRecipe}>Get a recipe</button>
                { props.loading && <CircularProgress /> }
              </div>
          </div>}
      </section>
  )
}