export function Input({ id, label, type = "text", value, onChange, error, required = false }) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}