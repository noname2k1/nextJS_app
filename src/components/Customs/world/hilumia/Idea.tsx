import React, { ChangeEvent, useState } from 'react';

interface Props {
  submitUrl?: string;
}

const Idea = (props: Props) => {
  const [idea, setIdea] = useState('');

  const handleIdeaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);
  };

  const handleSubmitIdea = () => {
    console.log(idea);
  };
  return (
    <div className="flex flex-col">
      <textarea
        name="idea"
        id="idea"
        cols={20}
        rows={8}
        className="resize-none rounded-md outline-none text-black p-4 text-lg"
        spellCheck={false}
        onChange={handleIdeaChange}
        placeholder="Start typing..."
        value={idea}
      ></textarea>
      <button
        onClick={handleSubmitIdea}
        className="bg-black rounded-md uppercase w-fit p-2.5 px-5 text-sm font-semibold mt-4 hover:bg-opacity-60"
      >
        Submit idea
      </button>
    </div>
  );
};

export default Idea;
