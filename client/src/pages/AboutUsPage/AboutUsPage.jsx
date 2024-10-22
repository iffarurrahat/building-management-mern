import { Helmet } from "react-helmet-async";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import Container from "../../components/ui/Container";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <EmptyStateMain title="About US" pathname="Home" />

      <Container>
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste totam
            hic itaque eveniet nobis voluptatem laudantium nisi, dolor aut! Modi
            perspiciatis similique a voluptatem alias vel, expedita inventore
            impedit aliquid?
          </p>
        </div>
      </Container>
    </>
  );
};

export default AboutUsPage;
