import PropType from 'prop-types'

function Student(props){
    return(
        <div className="student">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student: {props.isStudent ? "Yes" : "No" }</p>
        </div>
    );
}
Student.propTypes = {
    name: PropType.string,
    age: PropType.number,
    isStudent: PropType.bool,
}

export default Student;