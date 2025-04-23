/*
export const Input = ({
                          name,
                          label,
                          type,
                          id,
                          placeholder,
                          validation,
                          multiline,
                          className,
                      }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)

    const input_tailwind =
        'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

    return (
        <div className={cn('flex flex-col w-full gap-2', className)}>
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold capitalize">
                    {label}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputErrors.error.message}
                            key={inputErrors.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            {multiline ? (
                <textarea
                    id={id}
                    type={type}
                    className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
                    placeholder={placeholder}
                    {...register(`${name}`, validation)}
                ></textarea>
            ) : (
                <input
                    id={id}
                    type={type}
                    className={cn(input_tailwind)}
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            )}
        </div>
    )
}*/


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