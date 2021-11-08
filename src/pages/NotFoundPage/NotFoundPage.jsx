import PageTitle from "../../components/PageTitle/PageTitle";
import GoBackButton from "../../components/Buttons/GoBackBtn"; 
  
export default function NotFoundPage() {
  return(
    <>
      <GoBackButton/>
      <PageTitle text="404 Page not found!" />
    </>
  )  
}