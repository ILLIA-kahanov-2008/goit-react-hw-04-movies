import PageTitle from "../../components/PageTitle/PageTitle";
import GoBackButton from "../../components/Buttons/GoBackBtn"; 
  
export default function NotFoundPage({message}) {
  return(
    <>
      <GoBackButton/>
      <PageTitle text={message} />
    </>
  )  
}