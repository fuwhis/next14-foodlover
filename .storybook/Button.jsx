export const Button = ({ label, backgroundColor, ...props }) => {
  return (
    <button
      type='button'
      style={backgroundColor && { backgroundColor }}
      {...props}>
      {label}
    </button>
  )
}
