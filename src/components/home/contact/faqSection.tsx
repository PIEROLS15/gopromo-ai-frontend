import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/services/contactContent.service";

const FAQSection = () => {
    return (
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <Card key={i}>
                    <CardContent className="p-5">
                        <h3 className="font-bold mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default FAQSection;
