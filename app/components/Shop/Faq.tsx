import { NavLink } from "@remix-run/react";
import { useState } from "react";

const questionsAndAnswers = [
  {
    question: 'How do I use the VITA® Patch?',
    answer: 'Apply the VITA patch to a clean, dry area of skin, such as your upper arm or back. Press firmly to ensure it adheres properly. For best results, wear the patch for 8-12 hours.'
  },
  {
    question: 'Why should I use the VITA® Patch?',
    answer: 'The VITA patch delivers essential nutrients directly through your skin, acting quickly to prevent the crash, sustain your energy, and help you avoid the aftermath of a night out.'
  },
  {
    question: 'What does the VITA® Patch do?',
    answer: 'The VITA patch provides a blend of vitamins, antioxidants, and natural extracts that help reduce the effects of a night out by supporting liver function, replenishing lost nutrients, and aiding in overall recovery.'
  },
  {
    question: 'When will I feel the effects of the VITA® patch?',
    answer: 'Most people start feeling the benefits within 1 hour of application, with full effects typically experienced within a few hours, and lasting until next morning.'
  },
  {
    question: 'Why does VITA® use a transdermal system?',
    answer: 'Transdermal delivery skips the digestive process, ensuring that more nutrients reach your bloodstream quickly and efficiently, giving you faster results.'
  },
  {
    question: 'Is the VITA® patch compatible with my diet or dietary restrictions?',
    answer: 'Yes, the VITA patch is gluten-free, vegan, and cruelty-free, making it suitable for a wide range of dietary needs and lifestyle choices.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 60-day risk-free guarantee. If you’re not satisfied with the VITA® patch for any reason, you can return it within 60 days for a full refund.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship the VITA® patch worldwide. Shipping rates and delivery times may vary depending on your location.'
  },
  {
    question: 'What products does the VITA® patch replace?',
    answer: 'The VITA® patch can replace multiple recovery products such as oral supplements, energy drinks, and traditional hangover remedies by delivering a targeted blend of nutrients directly through your skin for faster and more efficient recovery.'
  },
  {
    question: 'What measures do you take to ensure the quality of the VITA® patch?',
    answer: 'We ensure the quality of the VITA® patch by sourcing high-quality ingredients, adhering to strict GMP standards during manufacturing, and conducting third-party testing to guarantee safety, potency, and purity in every batch.'
  },
  {
    question: 'Will the VITA® patch help me remember last night?',
    answer: 'Nope, but it’ll make sure you don’t regret it <3'
  }
];

export function Faq() {
  const [openInfo, setOpenInfo] = useState<number | null>(null);

  return (
    <section className="shop-faq">
      <h1>FAQs</h1>
      <div className="questions">
        {
          questionsAndAnswers.map((qa, i) => {
            return (
              <div className={`question ${openInfo === i ? 'expanded' : ''}`}>
                <h2 onClick={() => { setOpenInfo(openInfo === i ? null : i) }}>
                  {qa.question}
                  <img src={openInfo === i ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                </h2>

                <p>{qa.answer}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  );
}
