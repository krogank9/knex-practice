INSERT INTO blogful_articles (title, content, date_published)
    VALUES
        ('Thinkful Blog Article', 'This is a blog about thinkful. Find out more about the coding bootcamp', now() - '30 days'::INTERVAL),
        ('How to Cook Rice', 'Just use a rice cooker', now() - '29 days'::INTERVAL),
        ('What is the best fruit', 'Mangoes... or maybe bananas', now() - '25 days'::INTERVAL),
        ('What is my name', 'Logan', now() - '22 days'::INTERVAL),
        ('How many more of these do I have to write', '15 of them I think', now() - '20 days'::INTERVAL),
        ('Katamari Damacy', 'It has a good soundtrack', now() - '18 days'::INTERVAL),
        ('Dum Dum Dee Dum', 'Bum bum dum', now() - '15 days'::INTERVAL),
        ('Library Fun Times', 'I''m sitting in the library!', now() - '14 days'::INTERVAL),
        ('Ok', 'Ok this is epic', now() - '12 days'::INTERVAL),
        ('Kirby', 'That game''s pretty fun', now() - '11 days'::INTERVAL),
        ('Hello', 'Is anybody out there', now() - '10 days'::INTERVAL),
        ('Comfortably Numb', 'I have become', now() - '8 days'::INTERVAL),
        ('It''s raining outside', 'I like rainy days', now() - '4 days'::INTERVAL),
        ('Rain #2', 'The smell of rain on concrete', now() - '3 days'::INTERVAL),
        ('Pollution', 'Bad', now() - '2 days'::INTERVAL),
        ('I''m out of ideas', 'Me too', now() - '2 days'::INTERVAL),
        ('Blog A', 'This is blog #A', now() - '1 days'::INTERVAL),
        ('Blog Bee', 'Save the bees', now()),
        ('ABCDEFG', 'The alphabet', now()),
        ('Google', 'Don''t be evil', now())
;