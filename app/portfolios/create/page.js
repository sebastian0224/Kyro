import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function CreateForm() {
  return (
    <ModalPortfolio
      title="Create Portfolio"
      description="Set up a new portfolio to manage your investments"
    >
      <CreatePortfolioForm />
    </ModalPortfolio>
  );
}
