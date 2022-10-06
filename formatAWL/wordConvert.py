import requests

f = open("formatAWL/AWLRaw.txt", "r")
awl = f.read()
awl = awl.split('\n')
awl.pop(-1)

pluralList = []
pastTenseList = []

for i in range(len(awl)):
    awl[i] = awl[i].split()
    pluralList.append([])
    pastTenseList.append([])

    for w in awl[i]:
        pluralRes = requests.get(f"https://www.wordhippo.com/what-is/the-plural-of/{w}.html")
        while pluralRes.status_code != 200:
            input("Rate limited, press ENTER after switching IP.")
            try:
                pluralRes = requests.get(f"https://www.wordhippo.com/what-is/the-plural-of/{w}.html")
            except:
                pass

        pluralRes = pluralRes.text
        indexStart = pluralRes.find(f"The plural of {w} is ")
        if indexStart != -1:
            indexStart = pluralRes.find(f"The plural of {w} is ") + 18 + len(w)
            indexEnd = pluralRes.find('.', indexStart)
            answer = pluralRes[indexStart:indexEnd]

            if answer != w:
                pluralList[i].append(answer)
                print(f"S{i + 1}: {answer}")

        pastTenseRes = requests.get(f"https://www.wordhippo.com/what-is/the-past-tense-of/{w}.html")
        while pastTenseRes.status_code != 200:
            input("Rate limited, press ENTER after switching IP.")
            try:
                pastTenseRes = requests.get(f"https://www.wordhippo.com/what-is/the-past-tense-of/{w}.html")
            except:
                pass

        pastTenseRes = pastTenseRes.text
        indexStart = pastTenseRes.find(f"The past tense of {w} is ")
        if indexStart != -1:
            indexStart = pastTenseRes.find(f"The past tense of {w} is ") + 22 + len(w)
            indexEnd = pastTenseRes.find('.', indexStart)
            answer = pastTenseRes[indexStart:indexEnd]

            if answer != w:
                pastTenseList[i].append(answer)
                print(f"S{i + 1}: {answer}")


print(pluralList)
print(pastTenseList)
