import './movieCard.css'

const AddMovie = (props) => {

    // const checkRating = (e) => {
    //     return (e.target.value < 1 || e.target.value > 5) ? 'Enter a number between (1-5)' : e.target.value
    // }

    return (
        <div className="main">
          <div className="grid-2 border-add">
            <h1>Add new movie</h1>
            <input type="text" className="add-title" placeholder="Enter the title of the movie"/>
            <input type="text" className="add-poster" placeholder="Enter the link of the poster"/>
            <input type="number" max="5" min="1" className="add-rating"
             placeholder="Enter the rating from 1 to 5"/>
            <div>
              <button>Add</button>
              <button onClick={props.onCancel}>Cancel</button>
            </div>
          </div>
        </div>
    )
}
export default AddMovie;