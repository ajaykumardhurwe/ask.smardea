import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, Download, Share2, Play } from 'lucide-react';
import { FaWhatsapp, FaGooglePlay } from 'react-icons/fa';
import { Exam } from './exam';

export function CgPscTestList() {
  const { subject, topic } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTk8rnpNQmNvqfsLcBkapB_4vJVLOjIHw-zOlM6E2FeY8WxcvuSRSQR4cwr4T31cQR26x_Z5Ik4ShPG/pub?gid=332339889&single=true&output=csv';

  useEffect(() => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split('\n').slice(1); // Remove header row
        const parsedTests = rows.map((row) => {
          const [id, title, pdfUrl, testUrl] = row.split(',');
          return { id, title, pdfUrl, testUrl };
        });
        setTests(parsedTests);
      })
      .catch((error) => console.error('Error fetching tests:', error))
      .finally(() => setLoading(false)); // Stop loading once data is fetched
  }, []);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shareOnWhatsApp = (testTitle, testUrl) => {
    const message = `🚀 *${testTitle}* - MCQ Test is available!\n📖 Take the test here: ${testUrl}\n✅ Start preparing now!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">📚 </h1>

<Exam></Exam>

{/* <div style={{ 
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'flex-end', 
  position: 'fixed', 
  top: 0, 
  left: 50, 
  padding: '10px',
  backgroundColor: 'transparent',
  zIndex: 1000 ,
  opacity:1,
}}>
  <Link to="/profile" 
  className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
  >
          Profile
        </Link>

</div> */}

      <input
        type="text"
        placeholder="🔍 Search for a test..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                  <Link to={`/cgpscmcq/${subject}/${topic}/${test.id}`} className="text-blue-600">
                  <div className="flex items-center justify-between">
               <PlayCircle className="w-20 h-16 mt-0 text-blue-600 hover:underline" />
             </div>

                  </Link>
            
                </div>
                <Link to={`/cgpscmcq/${subject}/${topic}/${test.id}`} className="text-blue-600">
                <p className="text-gray-600 mt-2 hover:underline">🎯 Click to start the test</p>
                </Link>
                <a
                  href={test.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 mt-4 hover:underline"
                >
                  <Download className="w-5 h-5 mr-2" /> Download PDF 📄
                </a>

                <button
                  onClick={() => shareOnWhatsApp(test.title, test.testUrl)}
                  className="flex items-center text-red-500 mt-4 hover:underline"
                >
                  <Share2 className="w-5 h-5 mr-2" /> Share on WhatsApp <FaWhatsapp className="text-green-500 mt-2 hover:underline" />
                </button>

                <a
  href="https://play.google.com/store/apps/details?id=com.ajaykumardhurwe.ajaydhurwe"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center text-orange-600 mt-4 hover:underline"
>
  <FaGooglePlay className="w-6 h-6 mr-2 mt-0" /> Get App from Play Store 
</a>

              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No tests found.</p>
          )}
        </div>
      )}
    </div>
  );
}

