import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import IndividualProjectTracker from "./IndividualProjectTracker";


export default function IndividualProjectTrackerLayout() {
  const ID = useParams()
  
  return (
    <MainLayout>
     <IndividualProjectTracker ID1={ID}/>
    </MainLayout>
  );
}
