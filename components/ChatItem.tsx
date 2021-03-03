import React, { useEffect, useState } from 'react'
import { Chat } from '../next-env';
import ChatPreview from './ChatPreview';

interface Props {
  data: Chat
}
// Pulled this puppy from Android's library - pretty cool.
const regexp = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;

const ChatItem = (props: Props) => {
  const [text, setText] = useState('');
  const [urls, setUrls] = useState<string[]>([])
  const { data } = props;

  useEffect(() => {
    setText(data.text);
  }, [data.text])

  useEffect(() => {
    const matches = data.text.match(regexp);

    if (matches && matches.length > 0) {
      setText(() => {
        let finalText: string;
        for (let index = 0; index < matches.length; index++) {
          const element: string = matches[index];
          const url = (element.indexOf('://') === -1) ? 'http://' + element : element
          finalText = data.text.replace(
            element,
            `<a class="text-indigo-600 hover:underline" href="${url}" target="_blank">${element}</a>`
          )
          matches[index] = url;
        }
        return finalText;
      })
      setUrls(matches)
    }
  }, [data.text])

  return (
    <div className="text-sm mb-4 text-gray-800">
      <div><span className="font-bold">{data.email}</span> <span className="text-xs">{new Date(data.createdAt).toLocaleTimeString()}</span></div>
      <p className="leading-normal" dangerouslySetInnerHTML={{ __html: text }} />
      {urls.map((url, key) => (
        <ChatPreview url={url} key={key} />
      ))}
    </div>
  )
}

export default ChatItem
