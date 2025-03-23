import PricingCards from "@/components/global/pricing-cards";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/constants/faq";


const PricingPage = () => {
    return (
        <div className="px-4 md:px-20">
            <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Simple and transparent pricing
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                    Choose a plan that works for you. No hidden fees. No surprises.
                </p>
            </div>

            <PricingCards />

            <div className="mt-20 w-full">
                <div className="flex flex-col items-center justify-center w-full pt-12">
                    <h2 className="mt-6 text-2xl font-semibold text-center lg:text-3xl xl:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-lg mt-6 text-center text-neutral-500">
                        Here are some of the most common questions we get asked. If you have a question that isn&apos;t answered here, feel free to reach out to us.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto w-full mt-20">
                    <Accordion type="single" collapsible>
                        {faqData.map((faq) => (
                            <AccordionItem key={faq.question} value={faq.question}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>

    );
};

export default PricingPage;
