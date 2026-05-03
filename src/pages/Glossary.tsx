import React, { useState } from 'react';
import { Card } from '../components/Card';
import './Glossary.css';

const terms = [
  { term: 'Absentee Voting', definition: 'Voting by mail or by proxy for someone who is unable to attend the official polling station.' },
  { term: 'Ballot', definition: 'A device used to cast votes in an election, which can be paper or electronic.' },
  { term: 'Ballot Measure / Proposition', definition: 'A piece of proposed legislation to be approved or rejected by eligible voters.' },
  { term: 'Canvassing', definition: 'The systematic initiation of direct contact with individuals, commonly used during political campaigns.' },
  { term: 'Caucus', definition: 'A meeting of supporters or members of a specific political party or movement to choose candidates.' },
  { term: 'Candidate', definition: 'A person who applies for a job or is nominated for election.' },
  { term: 'Constituency', definition: 'A body of voters in a specified area who elect a representative to a legislative body.' },
  { term: 'Delegate', definition: 'A person sent or authorized to represent others, in particular an elected representative sent to a conference.' },
  { term: 'District', definition: 'A geographical area defined for the purpose of electing representatives to a legislative body.' },
  { term: 'Electoral College', definition: 'A body of people representing the states of the US, who formally cast votes for the election of the president and vice president.' },
  { term: 'Electoral Vote', definition: 'The vote cast in the Electoral College of the U.S. by the representatives of each state in a presidential election.' },
  { term: 'Exit Poll', definition: 'A poll of voters taken immediately after they have exited the polling stations, used to predict the outcome.' },
  { term: 'Franchise (Suffrage)', definition: 'The right to vote in political elections.' },
  { term: 'Gerrymandering', definition: 'The manipulation of the boundaries of an electoral constituency so as to favor one party or class.' },
  { term: 'Incumbent', definition: 'The current holder of a political office.' },
  { term: 'Lame Duck', definition: 'An elected official whose successor has already been elected or will be soon.' },
  { term: 'Midterm Election', definition: 'A type of election where the people can elect their representatives and other subnational officeholders in the middle of the term of the executive.' },
  { term: 'Partisan', definition: 'A strong supporter of a party, cause, or person.' },
  { term: 'Platform', definition: 'The declared policy of a political party or group.' },
  { term: 'Polling Place', definition: 'A location where voters cast their ballots in elections.' },
  { term: 'Popular Vote', definition: 'The total number of votes cast by eligible voters in an election.' },
  { term: 'Precinct', definition: 'One of several districts into which a city or town is divided for voting.' },
  { term: 'Primary Election', definition: 'An election that narrows the field of candidates before a general election for office.' },
  { term: 'Provisional Ballot', definition: 'A ballot used to record a vote when there are questions about a given voter\'s eligibility.' },
  { term: 'Swing State', definition: 'A US state where the two major political parties have similar levels of support among voters.' },
  { term: 'Turnout', definition: 'The percentage of eligible voters who cast a ballot in an election.' },
  { term: 'Voter Suppression', definition: 'A strategy used to influence the outcome of an election by discouraging or preventing specific groups of people from voting.' },
  { term: 'Write-in Candidate', definition: 'A candidate whose name does not appear on the ballot, but for whom voters may vote by writing in the person\'s name.' }
];

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = terms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glossary-container">
      <h1 className="text-center mb-4">Election Glossary</h1>
      <p className="text-center mb-8 subtitle">Search and learn key election terms.</p>

      <div className="search-container mb-8">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search for a term..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search glossary terms"
        />
      </div>

      <div className="terms-grid">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item) => (
            <Card key={item.term} title={item.term} className="term-card">
              <p>{item.definition}</p>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted col-span-full">No terms found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Glossary;
