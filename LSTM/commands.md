# Install the Paperspace node API

```
npm install -g paperspace-node

or with Python:
pip install paperspace

```
login in with your credentials from your command line:
```
paperspace login
```

## Training Instructions
***
### 1) Clone the repository
```
git clone https://github.com/Paperspace/training-lstm.git
cd training-lstm
```
***
### 2) Collect your data
Try to gather as much clean text data as you can! The more the better.

Once you have your data ready, create a new folder inside /data and called it anyway you want. Inside that new folder just add one file called input.txt that contains all your training data.

(A quick tip to concatenate many small disparate .txt files into one large training file: ```ls *.txt | xargs -L 1 cat >> input.txt)```

***
### 3) Run your code on Paperspace

```
python train.py --data_dir=./data/zora_neale_hurston \
--rnn_size 128 \
--num_layers 2 \
--seq_length 50 \
--batch_size 50 \
--num_epochs 50 \
--save_checkpoints ./checkpoints \
--save_model /artifacts
```


#### Now we can start the training process.
Just type:
```
paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command 'bash run.sh' --project 'LSTM training'
```

This might take take a while to run, LSTMs are known for talking time to train. A good thing is that you don't need to monitor the complete process, but you can check how it is going by typing:

```
paperspace jobs logs --tail --jobId YOUR_JOB_ID
```

***
## 4) Use the model in ml5.js
The model was saved inside the /artifacts folder of the job. So we first need to download it. From the root of the project change directory into /ml5js_example/models and the run:
```
paperspace jobs artifactsGet --jobId YOUR_JOB_ID
```

Now open the sketch.js file and change the name of your model in the following line:
```
const lstm = ml5.LSTMGenerator('./PATH_TO_YOUR_MODEL', onModelReady);
```

The rest of the code is fairly straight forward. Once we create our lstm method with ml5js, we can make it sample the model by using the following function:

```
  const data = {
      seed: 'The meaning of life is ',
      temperature: 0.5,
      length: 200
 };
 lstm.generate(data, function(results){
     /*  Do something with the results */
 });

```

The only thing left is to start a server to view our files. 

If you are using Python 3:

```
python -m http.server
```

Visit http://localhost:8000 and if everything went well you should see the demo.

***

## 5) Tuning the model

But in general, here are some good insights to consider given the size of the training dataset:

    * 2 MB:
        rnn_size 256 (or 128)
        layers 2
        seq_length 64
        batch_size 32
        dropout 0.25
    * 5-8 MB:
        rnn_size 512
        layers 2 (or 3)
        seq_length 128
        batch_size 64
        dropout 0.25
    * 10-20 MB:
        rnn_size 1024
        layers 2 (or 3)
        seq_length 128 (or 256)
        batch_size 128
        dropout 0.25
    * 25+ MB:
        rnn_size 2048
        layers 2 (or 3)
        seq_length 256 (or 128)
        batch_size 128
        dropout 0.25
***

Resource - https://blog.paperspace.com/training-an-lstm-and-using-the-model-in-ml5-js/
