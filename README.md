# Thinkific Categorize Your Expenses

For this test you’ll be using a CSV file included in this repository.
Please see the assignment document shared with you for detailed instructions.

1.  You can use any programming language you like
2.  Download this README for editing
3.  Answer questions about the assignment in this README
4.  Follow submission instructions

## Questions

Update this README file by answering the questions below:

### Date Or Reflection

The date you're submitting this.

The date of submission is November 3, 2021.

### Time spent

We want to ensure that this test doens't take up too much of your time.
Please share with us how much time it took you to complete.

From starting to code until completion of the assignment took two hours and 51 minutes. 

### Assumptions made

Use this section to tell us about any assumptions that you made when creating your solution.

- I assumed that all current Vendor names and new incoming vendor names will have at least one unique difference in the first 16 letters not including spaces
- Because I saw in the dataset that all the entries that had a Category also had a subcategory, I assumed in the future it would be the same. So there wouldn't be a brand new subcategory added without listing a category as well that cooresponds. 
- I assumed you wanted a simple script that does the two tasks specified with any csv data, so I didn't fix any problems with the current csv data set. For example, sometimes city of van payphone might have been written as city of van payph. I didn't make any changes to fix things that are not uniform. 
- I assumed time complexity was a more important factor than space complexity. 
### Shortcuts/Compromises made

We would love to hear about how you would improve on your submission.

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

- Due to time constraints, I used a third party library called papa parse and didn't look into any better or faster ways of parsing and unparsing csv data. 
- Due to time constraints, I did not refresh myself on the different sorting algorithms in order to find something that could be faster than the merge / tim sort. 
- I did not make the exporting of files unique everytime. So if you export once, you get an exported.csv file. If you export again, it will overwrite the current exported.csv file (unless you've moved the file)
- Due to time constraints, I did not do any error handling.
### Other information about your submission that you feel is important that we know

- I considered doing this scripting task in Python. However, even though I know basic python, I felt my skills weren't as good as javascript so it would take me a lot longer to do the same task in Python. I am open to practicing Python before the position if it's used often at Thinkific. 

## Submission

### Instructions to run assignment locally

Please provide us with the necessary instruction to run your program(s) here:

- Install the packages with npm install (The only package needed is PapaParse) 
- browse to the project directory in your terminal window. Then type `node thinkific.js` to run the program. 
- There are two parameters that you can also type when running the program. First is the file path, the second is options (0 and 1). 0 corresponds to exporting a csv file, 1 corresponds to generating a report in the command prompt.
`Example run: node thinkific.js tht-coop.csv 1`

### Packaging assignment for submission

See assignment document shared with you for what to submit for your assignment and where.

## Feedback

### Your feedback on this assignment

We are always looking to improve and would value your feedback on what we could do better or what we did well with this assignment.

I personally thought it was excellent to base the assignment on a real world problem that can come up on the job.