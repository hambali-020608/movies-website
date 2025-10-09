import { FiHelpCircle, FiChevronDown } from "react-icons/fi";

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
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2">
                        <FiHelpCircle className="text-blue-400" />
                        <span className="text-blue-300 text-sm font-medium">FAQ</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg">
                        Temukan jawaban untuk pertanyaan yang sering ditanyakan
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="group">
                            <div className="collapse collapse-arrow bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/50 hover:border-blue-500/30 rounded-xl transition-all duration-300">
                                <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                                
                                <div className="collapse-title font-semibold text-lg text-slate-100 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors">
                                        <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                                    </div>
                                    {item.question}
                                </div>
                                
                                <div className="collapse-content text-slate-300">
                                    <div className="pt-2 pl-11">
                                        <p className="leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400 mb-4">
                        Masih ada pertanyaan?
                    </p>
                    <a 
                        href="https://www.tiktok.com/@tyan.dev?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                    >
                        <span>Hubungi Kami</span>
                    </a>
                </div>
            </div>
        </section>
    );
}