import Link from "next/link";

const Logo = ({light = false}) => {

    // determine the logo color based on the light props

    const colorClass = light ? "text-white" : "text-primary"; 
  return (
   <Link href="/" className="font-primary text-2xl tracking-[4px]">
   <span className={colorClass}>
    Mustakim Al Noman
   </span>
   </Link>
  )
}

export default Logo