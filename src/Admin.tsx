import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('ඔබට');
  const [guestName, setGuestName] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const prefixes = [
    { value: 'ඔබට', label: 'obata (ඔබට)' },
    { value: 'ඔබ දෙපළට', label: 'oba depalata (ඔබ දෙපළට)' },
    { value: 'ඔබ ඇතුළු පවුලේ සැමට', label: 'oba athulu pawule samata (ඔබ ඇතුළු පවුලේ සැමට)' }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const baseUrl = window.location.origin;
    const url = `${baseUrl}/?to=${encodeURIComponent(guestName.trim())}&prefix=${encodeURIComponent(prefix)}`;
    
    setGeneratedUrl(url);

    const message = `ආදරණීය ${guestName.trim()} ${prefix} ❤️

අපගේ ජීවිතයේ සුවිශේෂීම දිනයක් වන අපගේ විවාහ මංගල්‍යයේ සතුට ඔබත් සමඟ බෙදා ගැනීමට අපි ඉතා ආදරයෙන් ඔබව ආරාධනා කරමු.

කරුණාකර පහත සබැඳිය හරහා අපගේ විවාහ ආරාධනා පත සහ සියලුම උත්සව විස්තර බලන්න 🌐:

${url}

ඔබගේ පැමිණීම අපට මහත් ආශීර්වාදයක් වන අතර, මෙම සුන්දර අවස්ථාව ඔබත් සමඟ සැමරීමට ලැබීම අපට මහත් ගෞරවයක් වනු ඇත.

ආදරයෙන්,
❤️ වෙනුක සහ කෞශල්‍යා`;

    setGeneratedMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const handleCopyLink = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-auto overflow-x-hidden bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            LINK GENERATOR
          </h1>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Select Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  {prefixes.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sanjaya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.99] flex justify-center items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Generate Link
            </button>
          </form>
        </div>

        {generatedMessage && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Generated Invitation Message
            </h2>
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 whitespace-pre-wrap text-slate-700 text-sm md:text-base leading-relaxed font-sans shadow-inner">
              {generatedMessage}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm active:scale-[0.99] flex justify-center items-center gap-2"
              >
                {copiedLink ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Copy Link Only
                  </>
                )}
              </button>
              
              <button
                onClick={handleCopyMessage}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm active:scale-[0.99] flex justify-center items-center gap-2"
              >
                {copiedMessage ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Full Message
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

