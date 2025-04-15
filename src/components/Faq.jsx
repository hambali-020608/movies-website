export default function Faq() {
    const faqItems = [
        
        {
            question: "Apakah layanan ini gratis?",
            answer: "Ya, NontonYuk21 sepenuhnya gratis untuk digunakan. Kami tidak memungut biaya apapun untuk menonton film."
        },
        {
            question: "Kenapa harus memilih NontonYuk21?",
            answer: "NontonYuk21 menawarkan koleksi film terlengkap, kualitas streaming tinggi, antarmuka yang mudah digunakan, dan update film terbaru secara berkala."
        },
        {
            question: "Apakah NontonYuk21 aman digunakan?",
            answer: "Sangat aman! Kami menggunakan teknologi enkripsi terbaru dan tidak menyimpan data pribadi pengguna. Selalu pastikan Anda mengakses situs resmi kami."
        },
        {
            question: "Bagaimana cara mencoba layanan ini?",
            answer: "Anda bisa langsung mulai menonton tanpa perlu registrasi. Cukup buka situs kami, pilih film yang ingin ditonton, dan nikmati!"
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            {faqItems.map((item, index) => (
                <div key={index} className="collapse collapse-arrow bg-transparent border border-red-400">
                    <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
                    <div className="collapse-title font-semibold">
                        {item.question}
                    </div>
                    <div className="collapse-content text-sm">
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}