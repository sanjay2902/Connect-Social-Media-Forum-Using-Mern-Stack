# Using open() to read a text file
with open("hello.txt", "r") as file:
    data = file.read()
    print(data)

# Reading a text file with line-by-line processing
with open("hello.txt", "r") as file:
    for line in file:
        print(line.strip())
