-- =============================================================
-- Seed: Sample Exercises for all CEFR levels
-- Run this in Supabase SQL Editor
-- =============================================================

-- ── READING EXERCISES ─────────────────────────────────────────

-- A1 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000001', 1, 1, 'reading', 'A1', 'easy',
  'My Family', 'Read a short text about a family and answer questions.',
  'Read the passage carefully, then answer the multiple choice questions.', 10, TRUE, TRUE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000001',
'My name is Tom. I have a small family. My mother is Lisa. She is a teacher. My father is John. He is a doctor. I have one sister. Her name is Anna. She is 8 years old. I am 10 years old. We have a dog. His name is Max. We live in a house. We are happy.',
60, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000001-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'What is the father''s job?', 'mcq', 'The text says "My father is John. He is a doctor."', 1, 1),
('a1000001-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'How old is Anna?', 'mcq', 'The text says "She is 8 years old."', 1, 2),
('a1000001-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'What is the dog''s name?', 'mcq', 'The text says "His name is Max."', 1, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000001-0000-0000-0000-000000000001', 'Teacher', FALSE, 1),
('a1000001-0000-0000-0000-000000000001', 'Doctor', TRUE, 2),
('a1000001-0000-0000-0000-000000000001', 'Engineer', FALSE, 3),
('a1000001-0000-0000-0000-000000000001', 'Pilot', FALSE, 4),
('a1000001-0000-0000-0000-000000000002', '6', FALSE, 1),
('a1000001-0000-0000-0000-000000000002', '8', TRUE, 2),
('a1000001-0000-0000-0000-000000000002', '10', FALSE, 3),
('a1000001-0000-0000-0000-000000000002', '12', FALSE, 4),
('a1000001-0000-0000-0000-000000000003', 'Buddy', FALSE, 1),
('a1000001-0000-0000-0000-000000000003', 'Rex', FALSE, 2),
('a1000001-0000-0000-0000-000000000003', 'Max', TRUE, 3),
('a1000001-0000-0000-0000-000000000003', 'Lucky', FALSE, 4);

-- A2 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000002', 1, 2, 'reading', 'A2', 'easy',
  'A Trip to the Zoo', 'Read about a visit to the zoo and answer questions.',
  'Read the passage and choose the best answer for each question.', 12, TRUE, FALSE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000002',
'Last Saturday, my family went to the zoo. We saw many animals. First, we visited the lions. They were sleeping in the sun. Then we walked to the elephant area. The elephants were eating grass. My favourite animal was the giraffe because it was very tall. We ate lunch near the lake. After lunch, we saw penguins. They were swimming in cold water. We left the zoo at 5 pm. It was a great day.',
85, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000002-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000002', 'What were the lions doing?', 'mcq', 'The text says "They were sleeping in the sun."', 1, 1),
('a1000002-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002', 'What was the writer''s favourite animal?', 'mcq', 'The text says "My favourite animal was the giraffe."', 1, 2),
('a1000002-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000002', 'What time did they leave the zoo?', 'mcq', 'The text says "We left the zoo at 5 pm."', 1, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000002-0000-0000-0000-000000000001', 'Eating', FALSE, 1),
('a1000002-0000-0000-0000-000000000001', 'Running', FALSE, 2),
('a1000002-0000-0000-0000-000000000001', 'Sleeping', TRUE, 3),
('a1000002-0000-0000-0000-000000000001', 'Swimming', FALSE, 4),
('a1000002-0000-0000-0000-000000000002', 'Lion', FALSE, 1),
('a1000002-0000-0000-0000-000000000002', 'Elephant', FALSE, 2),
('a1000002-0000-0000-0000-000000000002', 'Penguin', FALSE, 3),
('a1000002-0000-0000-0000-000000000002', 'Giraffe', TRUE, 4),
('a1000002-0000-0000-0000-000000000003', '3 pm', FALSE, 1),
('a1000002-0000-0000-0000-000000000003', '4 pm', FALSE, 2),
('a1000002-0000-0000-0000-000000000003', '5 pm', TRUE, 3),
('a1000002-0000-0000-0000-000000000003', '6 pm', FALSE, 4);

-- B1 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000003', 1, 6, 'reading', 'B1', 'medium',
  'Social Media and Young People', 'Read an article about social media habits and answer questions.',
  'Read the article carefully and answer all questions.', 15, TRUE, TRUE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000003',
'Social media has become a huge part of teenagers'' lives. A recent study found that young people between 13 and 17 years old spend an average of three hours per day on social media platforms. The most popular platforms are Instagram, TikTok, and YouTube.

While social media helps young people stay connected with friends and discover new interests, experts are concerned about its negative effects. Many teenagers report feeling anxious or unhappy after spending time on social media. They often compare themselves to the perfect images they see online.

However, not all effects are negative. Some teenagers use social media to learn new skills, share creative work, and connect with people who share their interests. The key, according to researchers, is balance and awareness of how social media makes you feel.',
130, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000003-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000003', 'How many hours per day do teenagers spend on social media on average?', 'mcq', 'The text states "spend an average of three hours per day."', 1, 1),
('a1000003-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000003', 'What negative feeling do many teenagers report after using social media?', 'mcq', 'The text says "Many teenagers report feeling anxious or unhappy."', 1, 2),
('a1000003-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000003', 'According to researchers, what is the key to using social media healthily?', 'mcq', 'The text ends with "The key is balance and awareness."', 1, 3),
('a1000003-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000003', 'Which platform is NOT mentioned in the article?', 'mcq', 'Instagram, TikTok and YouTube are mentioned. Twitter is not.', 1, 4);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000003-0000-0000-0000-000000000001', 'One hour', FALSE, 1),
('a1000003-0000-0000-0000-000000000001', 'Two hours', FALSE, 2),
('a1000003-0000-0000-0000-000000000001', 'Three hours', TRUE, 3),
('a1000003-0000-0000-0000-000000000001', 'Five hours', FALSE, 4),
('a1000003-0000-0000-0000-000000000002', 'Excited', FALSE, 1),
('a1000003-0000-0000-0000-000000000002', 'Anxious', TRUE, 2),
('a1000003-0000-0000-0000-000000000002', 'Motivated', FALSE, 3),
('a1000003-0000-0000-0000-000000000002', 'Bored', FALSE, 4),
('a1000003-0000-0000-0000-000000000003', 'Deleting accounts', FALSE, 1),
('a1000003-0000-0000-0000-000000000003', 'Using only one platform', FALSE, 2),
('a1000003-0000-0000-0000-000000000003', 'Balance and awareness', TRUE, 3),
('a1000003-0000-0000-0000-000000000003', 'Limiting to 1 hour daily', FALSE, 4),
('a1000003-0000-0000-0000-000000000004', 'Instagram', FALSE, 1),
('a1000003-0000-0000-0000-000000000004', 'TikTok', FALSE, 2),
('a1000003-0000-0000-0000-000000000004', 'Twitter', TRUE, 3),
('a1000003-0000-0000-0000-000000000004', 'YouTube', FALSE, 4);

-- B2 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000004', 1, 4, 'reading', 'B2', 'medium',
  'The Science of Sleep', 'Read a scientific article about sleep and its effects on the brain.',
  'Read the passage and answer the questions that follow.', 18, TRUE, TRUE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000004',
'Sleep is one of the most essential biological processes, yet it remains one of the least understood. Scientists have long known that humans spend approximately one-third of their lives asleep, but only recently have researchers begun to uncover why this is necessary.

During sleep, the brain undergoes a remarkable cleaning process. A system of channels expands, allowing cerebrospinal fluid to flush out waste products that accumulate during waking hours. Among these waste products is amyloid-beta, a protein associated with Alzheimer''s disease. This discovery suggests that chronic sleep deprivation may significantly increase the risk of neurodegenerative diseases.

Furthermore, sleep plays a critical role in memory consolidation. When we sleep, the brain replays the experiences of the day, strengthening important neural connections and discarding unnecessary information. Students who sleep well after studying consistently outperform those who do not.

Despite this evidence, modern society continues to undervalue sleep. Many people pride themselves on functioning with minimal sleep, viewing it as a sign of productivity. However, research consistently shows that sleep deprivation impairs cognitive function, emotional regulation, and physical health.',
175, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000004-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004', 'What process occurs in the brain during sleep according to paragraph 2?', 'mcq', 'The text describes a "cleaning process" where cerebrospinal fluid flushes waste.', 2, 1),
('a1000004-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000004', 'Which disease is linked to the protein amyloid-beta?', 'mcq', 'The text states amyloid-beta is "associated with Alzheimer''s disease."', 2, 2),
('a1000004-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000004', 'What does the author suggest about modern society''s attitude toward sleep?', 'mcq', 'The text says society "continues to undervalue sleep."', 2, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000004-0000-0000-0000-000000000001', 'It stores new memories permanently', FALSE, 1),
('a1000004-0000-0000-0000-000000000001', 'It flushes out waste products', TRUE, 2),
('a1000004-0000-0000-0000-000000000001', 'It generates new neurons', FALSE, 3),
('a1000004-0000-0000-0000-000000000001', 'It reduces blood pressure', FALSE, 4),
('a1000004-0000-0000-0000-000000000002', 'Parkinson''s disease', FALSE, 1),
('a1000004-0000-0000-0000-000000000002', 'Depression', FALSE, 2),
('a1000004-0000-0000-0000-000000000002', 'Alzheimer''s disease', TRUE, 3),
('a1000004-0000-0000-0000-000000000002', 'Insomnia', FALSE, 4),
('a1000004-0000-0000-0000-000000000003', 'Society prioritizes sleep highly', FALSE, 1),
('a1000004-0000-0000-0000-000000000003', 'Society undervalues sleep', TRUE, 2),
('a1000004-0000-0000-0000-000000000003', 'Society is unaware of sleep research', FALSE, 3),
('a1000004-0000-0000-0000-000000000003', 'Society sleeps too much', FALSE, 4);

-- C1 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000005', 1, 5, 'reading', 'C1', 'hard',
  'The Ethics of Artificial Intelligence', 'A complex text examining moral questions around AI development.',
  'Read the text and answer the questions, paying attention to the author''s argument and tone.', 20, TRUE, FALSE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000005',
'The rapid advancement of artificial intelligence presents humanity with a paradox of unprecedented proportions. On one hand, AI systems are solving problems that have confounded scientists for decades — from predicting protein structures to diagnosing cancers earlier than any human physician. On the other hand, the same technologies threaten to exacerbate existing inequalities, erode privacy, and fundamentally alter the nature of human labour.

Central to this debate is the question of accountability. When an AI system makes a consequential error — a self-driving car fatality, an algorithmic hiring decision that discriminates, a medical misdiagnosis — who bears responsibility? The developer? The deploying organisation? The AI itself? Current legal frameworks, designed for a world of human actors, struggle to accommodate entities that learn, adapt, and act in ways their creators did not explicitly program.

Philosophers and technologists are increasingly converging on the concept of "value alignment" — the challenge of ensuring AI systems pursue goals that are genuinely beneficial to humanity rather than merely optimising for narrow metrics. This is not merely a technical problem but a profoundly philosophical one: it requires us to articulate, with precision, what human flourishing actually means.

The stakes could not be higher. Unlike previous technological revolutions, the development of superintelligent AI — should it occur — would be an event without historical precedent. We would be, in effect, creating a new form of intelligence that may surpass our own.',
220, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000005-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000005', 'What does the author mean by describing AI as "a paradox of unprecedented proportions"?', 'mcq', 'The author means AI has both extraordinary benefits and serious dangers simultaneously.', 2, 1),
('a1000005-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000005', 'According to the text, why do current legal frameworks struggle with AI accountability?', 'mcq', 'Legal frameworks were designed for human actors, not adaptive AI systems.', 2, 2),
('a1000005-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000005', 'What is "value alignment" as described in the passage?', 'mcq', 'Value alignment is ensuring AI pursues goals genuinely beneficial to humanity.', 2, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000005-0000-0000-0000-000000000001', 'AI is confusing and hard to understand', FALSE, 1),
('a1000005-0000-0000-0000-000000000001', 'AI brings both great benefits and serious risks', TRUE, 2),
('a1000005-0000-0000-0000-000000000001', 'AI development is moving too slowly', FALSE, 3),
('a1000005-0000-0000-0000-000000000001', 'AI is only beneficial in medicine', FALSE, 4),
('a1000005-0000-0000-0000-000000000002', 'They are too complex for lawyers to understand', FALSE, 1),
('a1000005-0000-0000-0000-000000000002', 'They were built for human actors, not adaptive AI', TRUE, 2),
('a1000005-0000-0000-0000-000000000002', 'AI companies lobby against regulation', FALSE, 3),
('a1000005-0000-0000-0000-000000000002', 'There are no laws about technology', FALSE, 4),
('a1000005-0000-0000-0000-000000000003', 'Making AI more efficient', FALSE, 1),
('a1000005-0000-0000-0000-000000000003', 'Ensuring AI goals are genuinely beneficial to humanity', TRUE, 2),
('a1000005-0000-0000-0000-000000000003', 'Teaching AI to follow human commands', FALSE, 3),
('a1000005-0000-0000-0000-000000000003', 'Restricting AI to narrow tasks', FALSE, 4);

-- C2 Reading
INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('11111111-0000-0000-0000-000000000006', 1, 4, 'reading', 'C2', 'hard',
  'Consciousness and the Hard Problem', 'A philosophical text on the nature of conscious experience.',
  'Read critically and answer the inferential questions.', 25, TRUE, FALSE);

INSERT INTO reading_passages (exercise_id, body, word_count, sort_order) VALUES
('11111111-0000-0000-0000-000000000006',
'The "hard problem" of consciousness, a term coined by philosopher David Chalmers in 1995, refers to the difficulty of explaining why and how physical processes in the brain give rise to subjective experience. While neuroscience has made remarkable strides in mapping neural correlates of consciousness — identifying which brain regions activate during various mental states — it has conspicuously failed to bridge the explanatory gap between objective neural activity and the felt quality of experience.

Consider the redness of red, the painfulness of pain, or the distinctive taste of coffee. These phenomenal qualities — what philosophers call "qualia" — seem irreducibly subjective. No amount of information about wavelengths, nociceptors, or chemical compounds appears to fully capture what it is like to experience them. This is the explanatory gap that Chalmers argues cannot be closed by any purely physical account.

Critics of this position, including Daniel Dennett, argue that qualia are illusions — cognitive artefacts generated by a brain that mistakes its own representational processes for something deeper. On this view, the hard problem dissolves once we abandon our intuitive but mistaken notions of inner experience.

The debate remains unresolved and may be, as some argue, permanently so. It touches not only on the philosophy of mind but on the foundations of scientific explanation itself — raising the uncomfortable possibility that some aspects of reality may be constitutively resistant to third-person inquiry.',
210, 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, explanation, points, sort_order) VALUES
('a1000006-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000006', 'What does Chalmers'' "explanatory gap" refer to?', 'mcq', 'It refers to the gap between objective neural activity and subjective experience.', 3, 1),
('a1000006-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000006', 'How does Dennett''s view differ from Chalmers''?', 'mcq', 'Dennett argues qualia are illusions; Chalmers argues they are irreducibly real.', 3, 2),
('a1000006-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000006', 'What does the author imply in the final paragraph?', 'mcq', 'The author implies some questions may be beyond scientific resolution.', 3, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a1000006-0000-0000-0000-000000000001', 'The gap between different scientific disciplines', FALSE, 1),
('a1000006-0000-0000-0000-000000000001', 'The gap between neural activity and subjective experience', TRUE, 2),
('a1000006-0000-0000-0000-000000000001', 'The gap between philosophy and neuroscience', FALSE, 3),
('a1000006-0000-0000-0000-000000000001', 'The gap in our knowledge of brain anatomy', FALSE, 4),
('a1000006-0000-0000-0000-000000000002', 'Dennett agrees with Chalmers but uses different terminology', FALSE, 1),
('a1000006-0000-0000-0000-000000000002', 'Dennett says qualia are illusions; Chalmers says they are irreducibly real', TRUE, 2),
('a1000006-0000-0000-0000-000000000002', 'Dennett focuses on neuroscience while Chalmers focuses on philosophy', FALSE, 3),
('a1000006-0000-0000-0000-000000000002', 'Both agree the hard problem cannot be solved', FALSE, 4),
('a1000006-0000-0000-0000-000000000003', 'Science will eventually solve all philosophical problems', FALSE, 1),
('a1000006-0000-0000-0000-000000000003', 'Some aspects of reality may resist scientific explanation', TRUE, 2),
('a1000006-0000-0000-0000-000000000003', 'Consciousness is not worth studying', FALSE, 3),
('a1000006-0000-0000-0000-000000000003', 'Philosophy is more important than science', FALSE, 4);

-- ── WRITING EXERCISES ─────────────────────────────────────────

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('22222222-0000-0000-0000-000000000001', 1, 1, 'writing', 'A1', 'easy',
  'Write About Yourself', 'Write a short paragraph introducing yourself.',
  'Write a short paragraph about yourself. Include your name, age, and what you like.', 15, TRUE, FALSE);
INSERT INTO writing_tasks (exercise_id, prompt, min_words, max_words, criteria) VALUES
('22222222-0000-0000-0000-000000000001',
 'Write a short paragraph about yourself. Tell us your name, how old you are, where you live, and what your favourite things are.',
 30, 100,
 '[{"name":"Vocabulary","max_points":5},{"name":"Grammar","max_points":5},{"name":"Content","max_points":5}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('22222222-0000-0000-0000-000000000002', 1, 2, 'writing', 'B1', 'medium',
  'The Advantages of Public Transport', 'Write an opinion paragraph about public transport.',
  'Write a well-structured paragraph giving your opinion about public transport.', 20, TRUE, TRUE);
INSERT INTO writing_tasks (exercise_id, prompt, min_words, max_words, criteria) VALUES
('22222222-0000-0000-0000-000000000002',
 'Do you think people should use public transport more? Write a paragraph giving your opinion with at least TWO reasons to support your view.',
 80, 200,
 '[{"name":"Grammar","max_points":10},{"name":"Vocabulary","max_points":10},{"name":"Coherence","max_points":10},{"name":"Task Achievement","max_points":10}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('22222222-0000-0000-0000-000000000003', 1, 3, 'writing', 'B2', 'medium',
  'Remote Work: Pros and Cons', 'Write a balanced essay discussing remote work.',
  'Write a balanced discussion essay. Present both sides before giving your conclusion.', 30, TRUE, FALSE);
INSERT INTO writing_tasks (exercise_id, prompt, min_words, max_words, criteria) VALUES
('22222222-0000-0000-0000-000000000003',
 'Discuss the advantages and disadvantages of working from home. Do you think remote work should become the standard working arrangement? Support your arguments with relevant examples.',
 150, 350,
 '[{"name":"Grammar","max_points":10},{"name":"Vocabulary","max_points":10},{"name":"Coherence","max_points":10},{"name":"Task Achievement","max_points":10},{"name":"Argument Quality","max_points":10}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('22222222-0000-0000-0000-000000000004', 1, 4, 'writing', 'C1', 'hard',
  'Technology and Human Connection', 'Write a critical essay on technology''s impact on relationships.',
  'Write a well-argued essay with a clear thesis, supported paragraphs, and a conclusion.', 35, TRUE, FALSE);
INSERT INTO writing_tasks (exercise_id, prompt, min_words, max_words, criteria) VALUES
('22222222-0000-0000-0000-000000000004',
 'To what extent has technology improved or damaged human relationships? Critically examine this question, drawing on specific examples and acknowledging counter-arguments.',
 200, 450,
 '[{"name":"Grammar & Style","max_points":15},{"name":"Vocabulary Range","max_points":15},{"name":"Argument & Critical Thinking","max_points":20},{"name":"Coherence & Cohesion","max_points":10}]');

-- ── SPEAKING EXERCISES ────────────────────────────────────────

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('33333333-0000-0000-0000-000000000001', 1, 1, 'speaking', 'A1', 'easy',
  'Talk About Your Day', 'Describe what you did today.',
  'You will have 15 seconds to prepare, then 30 seconds to speak.', 5, TRUE, FALSE);
INSERT INTO speaking_tasks (exercise_id, prompt, prep_time_sec, record_time_sec, criteria) VALUES
('33333333-0000-0000-0000-000000000001',
 'Tell us about your day. What did you do this morning? What did you eat? What are you going to do later?',
 15, 30,
 '[{"name":"Pronunciation","max_points":5},{"name":"Fluency","max_points":5},{"name":"Vocabulary","max_points":5}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('33333333-0000-0000-0000-000000000002', 1, 2, 'speaking', 'B1', 'medium',
  'Describe a Memorable Journey', 'Talk about a trip or journey you remember.',
  'Prepare for 30 seconds, then speak for up to 90 seconds.', 10, TRUE, TRUE);
INSERT INTO speaking_tasks (exercise_id, prompt, prep_time_sec, record_time_sec, criteria) VALUES
('33333333-0000-0000-0000-000000000002',
 'Describe a journey or trip that was memorable for you. Where did you go? Who were you with? What made it special or difficult? What did you learn from the experience?',
 30, 90,
 '[{"name":"Pronunciation","max_points":10},{"name":"Fluency","max_points":10},{"name":"Vocabulary","max_points":10},{"name":"Grammar","max_points":10}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('33333333-0000-0000-0000-000000000003', 1, 3, 'speaking', 'B2', 'medium',
  'The Future of Education', 'Give your opinion on how education will change.',
  'Prepare for 30 seconds, then speak for up to 2 minutes.', 10, TRUE, FALSE);
INSERT INTO speaking_tasks (exercise_id, prompt, prep_time_sec, record_time_sec, criteria) VALUES
('33333333-0000-0000-0000-000000000003',
 'How do you think education will change in the next 20 years? Consider technology, online learning, and the role of teachers. Do you think these changes will be positive or negative overall?',
 30, 120,
 '[{"name":"Pronunciation","max_points":10},{"name":"Fluency","max_points":10},{"name":"Vocabulary","max_points":10},{"name":"Coherence","max_points":10},{"name":"Grammar","max_points":10}]');

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('33333333-0000-0000-0000-000000000004', 1, 5, 'speaking', 'C1', 'hard',
  'Globalisation: Opportunity or Threat?', 'Discuss the impact of globalisation.',
  'Prepare for 45 seconds, then speak for up to 2 minutes 30 seconds.', 15, TRUE, FALSE);
INSERT INTO speaking_tasks (exercise_id, prompt, prep_time_sec, record_time_sec, criteria) VALUES
('33333333-0000-0000-0000-000000000004',
 'To what extent is globalisation a positive force in the world? Discuss the economic, cultural, and social dimensions, and present a balanced argument before reaching your own conclusion.',
 45, 150,
 '[{"name":"Pronunciation & Clarity","max_points":15},{"name":"Fluency & Pace","max_points":15},{"name":"Vocabulary Range","max_points":15},{"name":"Argument Quality","max_points":15}]');

-- ── LISTENING EXERCISES ───────────────────────────────────────

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('44444444-0000-0000-0000-000000000001', 1, 1, 'listening', 'A2', 'easy',
  'At the Coffee Shop', 'Listen to a conversation at a coffee shop.',
  'Listen to the audio, then answer the questions. You may listen twice.', 10, TRUE, FALSE);
INSERT INTO listening_tracks (exercise_id, audio_url, transcript, sort_order) VALUES
('44444444-0000-0000-0000-000000000001', '',
 'Waiter: Good morning! What would you like?
Customer: Hi, can I have a coffee please?
Waiter: Sure. Small, medium or large?
Customer: Medium please. And a chocolate cake.
Waiter: Of course. That''s 4 dollars 50.
Customer: Here you go. Thank you.
Waiter: Your coffee will be ready in 2 minutes.', 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, points, sort_order) VALUES
('a4000001-0000-0000-0000-000000000001', '44444444-0000-0000-0000-000000000001', 'What size coffee does the customer order?', 'mcq', 1, 1),
('a4000001-0000-0000-0000-000000000002', '44444444-0000-0000-0000-000000000001', 'How much does the order cost?', 'mcq', 1, 2),
('a4000001-0000-0000-0000-000000000003', '44444444-0000-0000-0000-000000000001', 'What food does the customer order?', 'mcq', 1, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a4000001-0000-0000-0000-000000000001', 'Small', FALSE, 1),
('a4000001-0000-0000-0000-000000000001', 'Medium', TRUE, 2),
('a4000001-0000-0000-0000-000000000001', 'Large', FALSE, 3),
('a4000001-0000-0000-0000-000000000002', '$3.50', FALSE, 1),
('a4000001-0000-0000-0000-000000000002', '$4.50', TRUE, 2),
('a4000001-0000-0000-0000-000000000002', '$5.00', FALSE, 3),
('a4000001-0000-0000-0000-000000000003', 'Sandwich', FALSE, 1),
('a4000001-0000-0000-0000-000000000003', 'Muffin', FALSE, 2),
('a4000001-0000-0000-0000-000000000003', 'Chocolate cake', TRUE, 3);

INSERT INTO exercises (id, language_id, category_id, type, level, difficulty, title, description, instructions, estimated_minutes, is_published, is_featured)
VALUES ('44444444-0000-0000-0000-000000000002', 1, 3, 'listening', 'B2', 'medium',
  'Job Interview Tips', 'Listen to advice about job interviews.',
  'Listen carefully and answer questions about the key advice given.', 15, TRUE, TRUE);
INSERT INTO listening_tracks (exercise_id, audio_url, transcript, sort_order) VALUES
('44444444-0000-0000-0000-000000000002', '',
 'Today I want to share three important tips for job interviews.
First, always research the company before your interview. Employers are impressed when candidates know about their products, values, and recent news.
Second, prepare specific examples of your achievements. Instead of saying "I am a hard worker", say "In my last job, I increased sales by 20% in six months."
Third, ask thoughtful questions at the end. This shows genuine interest. For example, ask about the team culture or opportunities for growth.
Remember, confidence and preparation are the keys to success.', 1);

INSERT INTO questions (id, exercise_id, question_text, question_type, points, sort_order) VALUES
('a4000002-0000-0000-0000-000000000001', '44444444-0000-0000-0000-000000000002', 'What is the FIRST tip mentioned?', 'mcq', 1, 1),
('a4000002-0000-0000-0000-000000000002', '44444444-0000-0000-0000-000000000002', 'What example is given for the second tip?', 'mcq', 1, 2),
('a4000002-0000-0000-0000-000000000003', '44444444-0000-0000-0000-000000000002', 'According to the speaker, what are the keys to success?', 'mcq', 1, 3);

INSERT INTO answer_options (question_id, option_text, is_correct, sort_order) VALUES
('a4000002-0000-0000-0000-000000000001', 'Dress professionally', FALSE, 1),
('a4000002-0000-0000-0000-000000000001', 'Research the company', TRUE, 2),
('a4000002-0000-0000-0000-000000000001', 'Arrive early', FALSE, 3),
('a4000002-0000-0000-0000-000000000001', 'Bring your CV', FALSE, 4),
('a4000002-0000-0000-0000-000000000002', 'Getting promoted quickly', FALSE, 1),
('a4000002-0000-0000-0000-000000000002', 'Increasing sales by 20% in six months', TRUE, 2),
('a4000002-0000-0000-0000-000000000002', 'Managing a team of ten people', FALSE, 3),
('a4000002-0000-0000-0000-000000000002', 'Winning an employee award', FALSE, 4),
('a4000002-0000-0000-0000-000000000003', 'Appearance and punctuality', FALSE, 1),
('a4000002-0000-0000-0000-000000000003', 'Confidence and preparation', TRUE, 2),
('a4000002-0000-0000-0000-000000000003', 'Experience and education', FALSE, 3),
('a4000002-0000-0000-0000-000000000003', 'Networking and referrals', FALSE, 4);
