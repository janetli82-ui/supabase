const ErrorMessages = ({ error }:{ error:string }) => {
  return(
    <div className="text-muted text-left">
      {error === "NEXT_REDIRECT" ? "" : error}
    </div>
  )
}

export default ErrorMessages