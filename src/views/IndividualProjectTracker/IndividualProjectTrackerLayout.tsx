import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import IndividualProjectTracker from "./IndividualProjectTracker";

export default function IndividualProjectTrackerLayout() {
  const { id } = useParams(); // id is a string

  return (
    <MainLayout>
      <IndividualProjectTracker ID1={id} />
    </MainLayout>
  );
}
